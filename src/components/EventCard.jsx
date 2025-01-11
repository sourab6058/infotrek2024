import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Button, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
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
          className="img-fluid w-100"
          alt={event.name}
          style={{ maxHeight: "360px", objectFit: "cover" }} // Limit the height and ensure image covers space nicely
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
  );
}

export default EventCard;
