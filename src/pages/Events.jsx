import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventCard from "../components/EventCard";

function Events() {
  return (
    <Container className="my-5">
      <h1 className="font-bold text-6xl">Events</h1>
      <Row>
        <Col>
          <EventCard />
          <EventCard />
        </Col>
        <Col>
          <EventCard />
          <EventCard />
        </Col>
        <Col>
          <EventCard />
          <EventCard />
        </Col>
      </Row>
    </Container>
  );
}

export default Events;
