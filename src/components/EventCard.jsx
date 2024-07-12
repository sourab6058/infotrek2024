import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Badge, Col, Form, Row, Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function EventCard({ event }) {
  const [registrationsOpen, setRegistrationsOpen] = useState(false);
  let teamInputRef = useRef(null);
  useEffect(() => {
    setRegistrationsOpen(new Date(event.date_to) >= new Date().getTime());
  }, [event]);

  function handleRegister(event, registrationsOpen) {
    const teamName = teamInputRef.current.value;
    if (!registrationsOpen) {
      alert("Registrations are closed");
      return;
    }
    const token = localStorage.getItem("auth_token");
    if (event.category.toLowerCase() === "team") {
      if (teamName.length === 0) return alert("Please Enter team name");
      axios
        .post(
          "http://localhost:3000/api/event/register",
          {
            user_id: localStorage.getItem("userId"),
            event_id: event.id,
            team_name: teamName,
            status: "registered",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      axios
        .post(
          "http://localhost:3000/api/event/register/",
          {
            user_id: localStorage.getItem("userId"),
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
        });
    }
  }
  return (
    <>
      <Card style={{ margin: "1rem" }} key={uuidv4()}>
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
                <span>{new Date(event.date_to).toLocaleDateString()}</span>
                <span>{event.category}</span>
              </div>
            </div>
            <div className="flex justify-center items-end">
              <Button
                disabled={new Date(event.date_to) < new Date().getTime()}
                variant="primary"
                onClick={() => handleRegister(event, registrationsOpen)}
              >
                Register Now!
              </Button>
            </div>
          </div>
          <Form key={uuidv4()}>
            <Form.Group kye={uuidv4()} as={Row} className="mb-3 mt-2">
              <Form.Label column sm="2">
                Team
              </Form.Label>
              <Col>
                <Form.Control
                  disabled={event.category.toLowerCase() !== "team"}
                  type="text"
                  placeholder={
                    event.category.toLowerCase() === "team"
                      ? "Enter Team Name"
                      : "Team Not Required"
                  }
                  ref={teamInputRef}
                />
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default EventCard;
