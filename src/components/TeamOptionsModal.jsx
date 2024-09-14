import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default function TeamOptionsModal({
  isTeamOptionsModalOpen,
  setIsTeamOptionsModalOpen,
  teams,
  eventId,
  events,
}) {
  function handleTeamCreate(newTeamName) {
    //creates team,links user, event and the team.
    axios.post("http://localhost:3000/api/teams/new-user-team");
  }
  const [event, setEvent] = useState(null);
  const [newTeamName, setNewTeamName] = useState("");
  useEffect(() => {
    setEvent(events?.find((eve) => eve.id == eventId));
  }, [events, eventId]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={isTeamOptionsModalOpen}
        onHide={() => setIsTeamOptionsModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose or Create a Team.</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "70vh", overflowY: "scroll" }}>
          <h1>{event && event.name ? event.name : "Loading"}</h1>
          <div>
            <Form>
              {teams.map((team) => (
                <Form.Check
                  inline
                  label={team?.name}
                  name="teams"
                  type="radio"
                />
              ))}
              <InputGroup className="my-3">
                <Form.Control
                  placeholder="Your Team's Name"
                  aria-label="Your Team's Name"
                  aria-describedby="basic-addon2"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
                <Button
                  variant="outline-primary"
                  key={uuidv4()}
                  onClick={handleTeamCreate}
                >
                  Create and Join Team
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsTeamOptionsModalOpen(false)}
          >
            Close
          </Button>
          <Button variant="primary">Add Event</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
