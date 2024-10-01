import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventCard from "../components/EventCard";
import Nav from "../components/Nav";
import { images } from "../assets/imgs";
import "./styles/Events.css";
// import React, { useEffect } from "react";
// import NET from "vanta/src/vanta.net";
// import "./styles/TeamPage.css";

const events = [
  {
    id: "ccb8efb0-04d1-4da9-92fb-964181f73df5",
    name: "Algorithmia",
    img: images.ShortCoding,
    description:
      "Short coding event focusing on solving algorithmic challenges in limited time.",
    dateFrom: "2024-06-13",
    dateTo: "2024-11-22",
    location: "Trichy",
    category: "Technical",
    status: true,
  },
  {
    id: "ba60e742-34dd-4265-a453-76b3438bcb4e",
    name: "Break The Bug",
    img: images.Debugging,
    description:
      "Debugging event where participants fix code errors within given constraints.",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Chennai",
    category: "Technical",
    status: false,
  },
  {
    id: "c6b15a8c-7741-4ff5-a4c8-379f20687498",
    name: "Tech Quest",
    img: images.TechQuiz,
    description:
      "A tech-themed quiz challenging participants' knowledge across technology domains.",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Bangalore",
    category: "Technical",
    status: true,
  },
  {
    id: "49244bec-7275-444a-a843-294183e5c2f6",
    name: "CSS Battle",
    img: images.CssBattle,
    description:
      "Development-based event with 2 rounds focused on front-end design and coding.",
    location: "Hyderabad",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    category: "Technical",
    status: true,
  },
  {
    id: "226edc40-4f65-4901-9118-413b2d0af92c",
    name: "Shadow Lands",
    img: images.ShadowLands,
    description:
      "Online gaming event developed by ACM members, testing strategy and gaming skills.",
    dateFrom: "2024-06-13",
    dateTo: "2022-11-22",
    location: "Trichy",
    category: "Non-Technical",
    status: true,
  },
  {
    id: "5b6a6f0a-402d-4544-b855-88ac412e0b46",
    name: "Mystic Maze",
    img: images.TreasureHunt,
    description:
      " A treasure hunt event requiring problem-solving and puzzle-solving skills.",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Chennai",
    category: "Non-Technical",
    status: false,
  },
  {
    id: "09d862e1-41b5-473f-ae3a-1e41122b2a36",
    name: "Lightning Fingers",
    img: images.TypingRace,
    description:
      " A speed-based typing race event testing participants' typing accuracy and speed.",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    location: "Bangalore",
    category: "Non-Technical",
    status: true,
  },
  {
    id: "6785ccdd-bf3f-4cce-aa92-c8194056b880",
    name: "Micromania Madness",
    img: images.MicromaniaMadness,
    description:
      "Fun, non-tech event focused on entertainment and creative challenges.",
    location: "Hyderabad",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    category: "Non-Technical",
    status: true,
  },
  {
    id: "5f1db943-f296-4490-8b74-d4aa9561563b",
    name: "Destinite",
    img: images.Destinite,
    description:
      "Personal interview event evaluating communication and personal presentation skills.",
    location: "Hyderabad",
    dateFrom: "2024-09-13",
    dateTo: "2024-11-22",
    category: "Non-Technical",
    status: true,
  },
];

function Events() {
  // useEffect(() => {
  //   const netEffects = NET({
  //     el: "#events",
  //     mouseControls: true,
  //     backgroundColor: "rgb(245, 245, 245)",
  //     color: "rgb(85, 85, 85)",
  //     touchControls: true,
  //     gyroControls: false,
  //     minHeight: 400.0,
  //     minWidth: 200.0,
  //     scale: 200.0,
  //     scaleMobile: 2.0,
  //   });
  // }, []);

  return (
    <>
      <Nav />
      <div className="events" id="events">
        <Container className="events_container my-5">
          <h1 className="font-bold text-center pb-5">Events</h1>
          <Row style={{ paddingBottom: "2rem" }}>
            {events.map((event, idx) => (
              <Col xs={12} md={6} lg={4} key={event.id} className="mb-4">
                <EventCard event={event} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Events;
