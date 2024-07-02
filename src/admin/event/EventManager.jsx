import React, { useState } from "react";
import { Container } from "react-bootstrap";

import AddEventModal from "./AddEventModal.jsx";
import EventsTable from "./EventsTable.jsx";

export default function EventManager() {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  return (
    <div>
      <Container fluid="xxl">
        <h1>Manage Events</h1>
        <div className="flex flex-column p-5 m-5 justify-between items-center">
          <div className="flex flex-column justify-center items-end w-100">
            <button
              onClick={() => setIsEventModalOpen(true)}
              className="text-xl outline-none bg-neon-100 px-3 py-2 rounded font-bold hover:bg-neon-80"
            >
              + Add Event
            </button>
          </div>
          <div className="m-2">
            <EventsTable />
          </div>
        </div>
        <AddEventModal
          isEventModalOpen={isEventModalOpen}
          setIsEventModalOpen={setIsEventModalOpen}
        />
      </Container>
    </div>
  );
}
