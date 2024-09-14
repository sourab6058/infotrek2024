import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import TeamOptionsModal from "../components/TeamOptionsModal";

function Events() {
  const [events, setEvents] = useState(null);
  const [isTeamOptionsModalOpen, setIsTeamOptionsModalOpen] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/event").then((res) => {
      setEvents(res.data);
      console.log(res);
    });
    axios.get("http://localhost:3000/api/teams").then((res) => {
      setTeams(res.data);
    });
  }, []);
  return (
    <>
      <Nav />
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
                      <EventCard
                        event={events[idx]}
                        setIsTeamOptionsModalOpen={setIsTeamOptionsModalOpen}
                        setEventId={setEventId}
                      />
                    </Col>,
                    <Col>
                      <EventCard
                        event={events[idx + 1]}
                        setIsTeamOptionsModalOpen={setIsTeamOptionsModalOpen}
                        setEventId={setEventId}
                      />
                    </Col>,
                  ]}
                </Row>
              ) : (
                <Row>
                  <Col>
                    {
                      <EventCard
                        event={events[idx]}
                        setIsTeamOptionsModalOpen={setIsTeamOptionsModalOpen}
                        setEventId={setEventId}
                      />
                    }
                  </Col>
                  <Col></Col>
                </Row>
              ))
          )}
      </Container>
      <TeamOptionsModal
        eventId={eventId}
        events={events}
        isTeamOptionsModalOpen={isTeamOptionsModalOpen}
        setIsTeamOptionsModalOpen={setIsTeamOptionsModalOpen}
        teams={teams}
      />
    </>
  );
}

export default Events;
