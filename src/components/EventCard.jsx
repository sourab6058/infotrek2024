import { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import axios from "axios";
import { Badge, Card, Button, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "../pages/styles/Events.css";

import { AuthContext } from "../AuthContext";

import { eventRegister, eventUnregister } from "../../api";
import { Link } from "react-router-dom";

function EventCard({ event, setAlertMsg, setShow, setAlertTitle, setVariant }) {
  const token = localStorage.getItem("auth_token");
  const [registrationsOpen, setRegistrationsOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const user = useContext(AuthContext);
  // console.log("ID", event.id);
  useEffect(() => {
    setRegistrationsOpen(new Date(event.dateTo) >= new Date().getTime());
    if (user?.events?.some((e) => e?.event_id == event?.id))
      setRegistered(true);
  }, [event, user]);

  function handleRegister(event, registrationsOpen, user) {
    if (!user.isLoggedIn) {
      setVariant("warning");
      setAlertTitle("Login Required");
      setAlertMsg("You need to login before registering for the event");
      setShow(true);
      return;
    }

    if (!registrationsOpen) {
      setVariant("danger");
      setAlertTitle("Registrations are closed.");
      setAlertMsg("You cannot register for an event after the last date.");
      setShow(true);
      return;
    }
    axios
      .post(
        eventRegister,
        {
          user_id: user.userId,
          event_id: event.id,
          team_name: "ind",
          status: "registered",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          setVariant("success");
          setAlertTitle("Event registered.");
          setAlertMsg("You have been successfully registered for the event.");
          setShow(true);
          let events = JSON.parse(localStorage.getItem("events"));
          events = [...events, res.data];
          user.setEvents(events);
          localStorage.setItem("events", JSON.stringify(events));
          setRegistered(true);
        }
      })
      .catch((err) => {
        // console.error(err);
        if (err.response.status == 401) {
          setVariant("primary");
          setAlertTitle("Event registered.");
          setAlertMsg("You have already registereed for this event.");
          setShow(true);
          setRegistered(true);
        } else {
          setVariant("warning");
          setAlertTitle("You are not logged in.");
          setAlertMsg("You have to login first.");
          setShow(true);
        }
      });
  }
  function handleUnregister(event) {
    axios
      .post(
        eventUnregister,
        {
          user_id: user.userId,
          event_id: event.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.status == 201) {
          setVariant("success");
          setAlertTitle("Event unregistered.");
          setAlertMsg("You have successfully unregisterd from the event.");
          setShow(true);
        }
        let events = JSON.parse(localStorage.getItem("events"));
        events = events.filter((e) => e.event_id != event.id);
        user.setEvents(events);
        localStorage.setItem("events", JSON.stringify(events));
        setRegistered(false);
      })
      .catch((err) => {
        // console.error(err);
        if (err.response.status == 401) {
          setVariant("primary");
          setAlertTitle("Event registered.");
          setAlertMsg("You have already unregisterd from the event.");
          setShow(true);
          setRegistered(true);
        }
        setRegistered(false);
      });
  }
  return (
    <div className="event_card">
      <Card style={{ margin: "1rem" }} key={uuidv4()}>
        <Image
          src={event?.img || "https://via.placeholder.com/600x400"} // Placeholder or event image URL
          className="img-fluid w-80"
          alt={event.name}
          style={{
            maxHeight: "fit-content",
            objectFit: "contain",
            objectPosition: "center",
          }} // Limit the height and ensure image covers space nicely
        />
        <Card.Body>
          <div className="flex-col justify-between items-center pb-5">
            <Card.Title>
              <h2>{event.name}</h2>
            </Card.Title>
            <Badge bg={registrationsOpen ? "success" : "secondary"}>
              {registrationsOpen
                ? "Registrations Open"
                : "Registrations Closed"}
            </Badge>
          </div>
          <Card.Text>
            <span className="text-lg">{event.description}</span>
          </Card.Text>
          <div className="flex-col justify-between">
            <div className="flex gap-5">
              <div className="flex flex-column gap-1">
                <span>Last Date</span>
                <span>Category</span>
                <span>Location</span>
              </div>
              <div className="flex flex-column gap-1">
                <span>{new Date(event.dateTo).toLocaleDateString()}</span>
                <span>{event.category}</span>
                <span>{event.location}</span>
              </div>
            </div>
            <div className="flex justify-end items-center pt-3 min-w-100 gap-2">
              {registered ? (
                <Button
                  className="min-w-64"
                  // disabled={
                  //   new Date(event.date_to) < new Date().getTime() ||
                  //   !user.isLoggedIn
                  // }
                  variant="danger"
                  onClick={() => handleUnregister(event)}
                >
                  <b>Unregister</b>
                </Button>
              ) : (
                <Button
                  className="min-w-64 "
                  disabled={new Date(event.date_to) < new Date().getTime()}
                  variant="success"
                  onClick={() => handleRegister(event, registrationsOpen, user)}
                >
                  <b>Register</b>
                </Button>
              )}
              <Link to="#" style={{ visibility: "hidden", width: 0 }}>
                <Button>View More</Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
    // <div className="bg-white rounded shadow flex flex-column p-2">
    //   <div className="flex flex-row gap-2 min-h-[250px]">
    //     <img
    //       src={event?.img || "https://via.placeholder.com/600x400"}
    //       alt="Logo for the event"
    //       className="w-50 rounded"
    //     />
    //     <div className="flex flex-column items-start justify-content-between">
    //       <span className="font-bold text-3xl">{event.name}</span>
    //       <div className="flex-column mt-2  text-slate-700">
    //         <div className="flex gap-1 items-center font-semibold mb-1">
    //           <FaLocationDot className="text-green-400 text-2xl" />
    //           {event.location}
    //         </div>
    //         <div className="flex gap-1 items-center mb-1">
    //           <span className="font-semibold">
    //             <AiFillClockCircle className="text-blue-400 text-2xl" />
    //           </span>
    //           Last date on{" "}
    //           <span className="font-semibold">
    //             {new Date(event.dateTo).toDateString()}
    //           </span>
    //         </div>
    //         <div className="flex gap-1 items-center font-semibold mb-1">
    //           <BiSolidCategoryAlt className="text-yellow-400 text-2xl" />
    //           {event.category}
    //         </div>
    //       </div>
    //       <div className="flex flex-row items-center justify-content-between">
    //         <div>
    //           <span>i</span>
    //           <span>Not Registered</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EventCard;
