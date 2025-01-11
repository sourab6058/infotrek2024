import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventCard from "../components/EventCard";
import Nav from "../components/Nav";
import AlertMini from "../components/AlertMini";

import { images } from "../assets/imgs";
import "./styles/Events.css";

const events = [
  {
    id: "ccb8efb0-04d1-4da9-92fb-964181f73df5",
    name: "Algorithmia",
    img: images.ShortCoding,
    description:
      "Short coding event focusing on solving algorithmic challenges in limited time.",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-17",
    location: "Marigold Lab, Third I",
    category: "Technical",
    status: true,
  },
  {
    id: "ba60e742-34dd-4265-a453-76b3438bcb4e",
    name: "Break The Bug",
    img: images.Debugging,
    description:
      "Debugging event where participants fix code errors within given constraints.",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-18",
    location: "Marigold Lab, Third I",
    category: "Technical",
    status: false,
  },
  {
    id: "c6b15a8c-7741-4ff5-a4c8-379f20687498",
    name: "Tech Quest",
    img: images.TechQuiz,
    description:
      "A tech-themed quiz challenging participants' knowledge across technology domains.",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-19",
    location: "Marigold Lab, Third I",
    category: "Technical",
    status: true,
  },
  {
    id: "49244bec-7275-444a-a843-294183e5c2f6",
    name: "CSS Battle",
    img: images.CssBattle,
    description:
      "Development-based event with 2 rounds focused on front-end design and coding.",
    location: "Marigold Lab, Third I",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-19",
    category: "Technical",
    status: true,
  },
  {
    id: "226edc40-4f65-4901-9118-413b2d0af92c",
    name: "Shadow Lands",
    img: images.ShadowLands,
    description:
      "Online gaming event developed by ACM members, testing strategy and gaming skills.",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-17",
    location: "Hostel",
    category: "Non-Technical",
    status: true,
  },
  {
    id: "5b6a6f0a-402d-4544-b855-88ac412e0b46",
    name: "Mystic Maze",
    img: images.TreasureHunt,
    description:
      " A treasure hunt event requiring problem-solving and puzzle-solving skills.",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-18",
    location: "Marigold Lab, Third I",
    category: "Non-Technical",
    status: false,
  },
  {
    id: "09d862e1-41b5-473f-ae3a-1e41122b2a36",
    name: "Lightning Fingers",
    img: images.TypingRace,
    description:
      " A speed-based typing race event testing participants' typing accuracy and speed.",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-18",
    location: "Marigold Lab, Third I",
    category: "Non-Technical",
    status: true,
  },
  {
    id: "5f1db943-f296-4490-8b74-d4aa9561563b",
    name: "Destinite",
    img: images.Destinite,
    description:
      "Personal interview event evaluating communication and personal presentation skills.",
    location: "GJCH Hall",
    dateFrom: "2025-01-10",
    dateTo: "2025-01-19",
    category: "Non-Technical",
    status: true,
  },
];

function Events() {
  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [variant, setVariant] = useState("primary");

  return (
    <>
      <Nav />
      <div className="events" id="events">
        <div className="w-100 flex h-[40vh] bg-[#43754c] flex-row items-center justify-content-start pl-2 mb-2 text-white overflow-hidden custom-shadow-header">
          <div>
            <span className="font-black text-5xl md:text-6xl">
              Featured Events
            </span>
            <br />
            <span className="ml-1 font-thin text-2xl md:text-3xl">
              Innovate. Code. Conquer.
            </span>
          </div>
        </div>
        <Container className="events_container my-5">
          <Row style={{ paddingBottom: "2rem" }}>
            {events.map((event, idx) => (
              <Col xs={12} md={6} lg={4} key={event.id} className="mb-4">
                <EventCard
                  event={event}
                  setShow={setShow}
                  setAlertMsg={setAlertMsg}
                  setAlertTitle={setAlertTitle}
                  setVariant={setVariant}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <AlertMini
        message={alertMsg}
        title={alertTitle}
        show={show}
        setShow={setShow}
        variant={variant}
        setVariant={setVariant}
      />
    </>
  );
}

export default Events;
