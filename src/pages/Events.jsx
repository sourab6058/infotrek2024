import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:3000/api/event").then((res) => {
      setEvents(res.data);
      console.log(res);
    });
  }, []);
  return (
    <Container className="my-5">
      <h1 className="font-bold text-6xl">Events</h1>
      {events &&
        events.map(
          (_, idx) =>
            idx % 2 == 0 &&
            (idx + 1 < events.length ? (
              <Row>
                {[
                  <Col>
                    <EventCard event={events[idx]} />
                  </Col>,
                  <Col>
                    <EventCard event={events[idx + 1]} />
                  </Col>,
                ]}
              </Row>
            ) : (
              <Row>
                <Col>{<EventCard event={events[idx]} />}</Col>
                <Col></Col>
              </Row>
            ))
        )}
    </Container>
  );
}

export default Events;
