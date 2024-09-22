import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Button, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";

import { AuthContext } from "../AuthContext";

import { eventRegister, eventUnregister } from "../../api";

const token = localStorage.getItem("auth_token");

function EventCard({ event }) {
  const [registrationsOpen, setRegistrationsOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const user = useContext(AuthContext);
  console.log("ID", event.id);
  useEffect(() => {
    setRegistrationsOpen(new Date(event.dateTo) >= new Date().getTime());
    if (user?.events?.some((e) => e?.event_id == event?.id))
      setRegistered(true);
  }, [event, user]);

  function handleRegister(event, registrationsOpen) {
    if (!registrationsOpen) {
      alert("Registrations are closed");
      return;
    }
    // console.log("API", eventRegister, {
    //   user_id: user.userId,
    //   event_id: event.id,
    //   team_name: "ind",
    //   status: "registered",
    // });
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
        console.log(res);
        if (res.status == 201) {
          alert("You have been successfully registerd for the event.✅");
          let events = JSON.parse(localStorage.getItem("events"));
          events = [...events, res.data];
          user.setEvents(events);
          localStorage.setItem("events", JSON.stringify(events));
          setRegistered(true);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status == 401)
          alert("➕You have already registerd for this event.➕");
        setRegistered(true);
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
        console.log(res);
        if (res.status == 201)
          alert("Unregsitered from the event successfully.✅");
        let events = JSON.parse(localStorage.getItem("events"));
        events = events.filter((e) => e.event_id != event.id);
        user.setEvents(events);
        localStorage.setItem("events", JSON.stringify(events));
        setRegistered(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status == 401)
          alert("➕You have already unregisterd for this event.➕");
        setRegistered(false);
      });
  }
  return (
    <>
      <Card style={{ margin: "1rem" }} key={uuidv4()}>
        <Image
          src={event?.img || "https://via.placeholder.com/600x400"} // Placeholder or event image URL
          className="img-fluid w-100"
          alt={event.name}
          style={{ maxHeight: "400px", objectFit: "contain" }} // Limit the height and ensure image covers space nicely
        />
        <Card.Body>
          <div className="flex justify-between items-center">
            <Card.Title>
              <h1>{event.name}</h1>
            </Card.Title>
            <Badge bg={registrationsOpen ? "success" : "secondary"}>
              {registrationsOpen
                ? "Registrations Open"
                : "Registrations Closed"}
            </Badge>
          </div>
          <Card.Text>
            <p className="text-lg">{event.description}</p>
          </Card.Text>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div className="flex flex-column gap-1">
                <span>Location</span>
                <span>Last Date</span>
                <span>Category</span>
              </div>
              <div className="flex flex-column gap-1">
                <span>{event.location}</span>
                <span>{new Date(event.dateTo).toLocaleDateString()}</span>
                <span>{event.category}</span>
              </div>
            </div>
            <div className="flex flex-column justify-end items-center">
              {registered ? (
                <Button
                  className="min-w-64"
                  disabled={
                    new Date(event.date_to) < new Date().getTime() ||
                    !user.isLoggedIn
                  }
                  variant="danger"
                  onClick={() => handleUnregister(event)}
                >
                  <b>Unregister</b>
                </Button>
              ) : (
                <Button
                  className="min-w-64"
                  disabled={
                    new Date(event.date_to) < new Date().getTime() ||
                    !user.isLoggedIn
                  }
                  variant="success"
                  onClick={() => handleRegister(event, registrationsOpen)}
                >
                  <b>Register</b>
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default EventCard;
