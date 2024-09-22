import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventCard from "../components/EventCard";
import Nav from "../components/Nav";
import { images } from "../assets/imgs";
const events = [
  {
    id: "ccb8efb0-04d1-4da9-92fb-964181f73df5",
    name: "Algorithmia",
    img: images.CssBattle,
    description: "It is a fun interview event",
    dateFrom: "2024-06-13",
    dateTo: "2024-11-22",
    location: "Trichy",
    category: "Technical",
    status: true,
  },
  {
    id: "ba60e742-34dd-4265-a453-76b3438bcb4e",
    name: "Tech ",
    description: "A conference on the latest tech trends",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Chennai",
    category: "Technical",
    status: false,
  },
  {
    id: "c6b15a8c-7741-4ff5-a4c8-379f20687498",
    name: "Career Fair",
    description: "A fair to explore career opportunities",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Bangalore",
    category: "Career",
    status: true,
  },
  {
    id: "49244bec-7275-444a-a843-294183e5c2f6",
    name: "Art Workshop",
    description: "A workshop for budding artists",
    location: "Hyderabad",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    category: "Art",
    status: true,
  },
  ,
  {
    id: "226edc40-4f65-4901-9118-413b2d0af92c",
    name: "Destinite",
    description: "It is a fun interview event",
    dateFrom: "2024-06-13",
    dateTo: "2022-11-22",
    location: "Trichy",
    category: "Technical",
    status: true,
  },
  {
    id: "5b6a6f0a-402d-4544-b855-88ac412e0b46",
    name: "Tech ",
    description: "A conference on the latest tech trends",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Chennai",
    category: "Technical",
    status: false,
  },
  {
    id: "09d862e1-41b5-473f-ae3a-1e41122b2a36",
    name: "Career Fair",
    description: "A fair to explore career opportunities",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Bangalore",
    category: "Career",
    status: true,
  },
  {
    id: "6785ccdd-bf3f-4cce-aa92-c8194056b880",
    name: "Art Workshop",
    description: "A workshop for budding artists",
    location: "Hyderabad",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    category: "Art",
    status: true,
  },
  {
    id: "5f1db943-f296-4490-8b74-d4aa9561563b",
    name: "Art Workshop",
    description: "A workshop for budding artists",
    location: "Hyderabad",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    category: "Art",
    status: true,
  },
];

function Events() {
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
                      <EventCard event={events[idx]} />
                    </Col>,
                    <Col>
                      <EventCard event={events[idx + 1]} />
                    </Col>,
                  ]}
                </Row>
              ) : (
                <Row>
                  <Col>
                    {<EventCard event={events[idx]} setEventId={setEventId} />}
                  </Col>
                  <Col></Col>
                </Row>
              ))
          )}
      </Container>
    </>
  );
}

export default Events;
