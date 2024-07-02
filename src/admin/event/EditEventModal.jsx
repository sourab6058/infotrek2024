import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";

export default function EditEventModal({
  isEditEventModalOpen,
  setIsEditEventModalOpen,
  data,
  rowChosen,
}) {
  const dateFromFormat = new Date(data.date_from);
  const dataToFormat = new Date(data.date_to);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [dateFrom, setDateFrom] = useState(
    `${
      dateFromFormat.getFullYear
    }-${dateFromFormat.getMonth()}-${dateFromFormat.getDay()}`
  );
  const [dateTo, setDateTo] = useState(data.date_to);
  const [location, setLocation] = useState(data.location);
  const [category, setCategory] = useState(data.category);
  const [status, setStatus] = useState(data.status);

  function clearForm() {
    setName("");
    setDescription("");
    setDateFrom("");
    setDateTo("");
    setLocation("");
    setCategory("");
    setStatus("");
  }
  useState(() => {
    console.log(data);
  }, [rowChosen]);

  function handleSubmit(
    event,
    { name, description, dateFrom, dateTo, location, category, status }
  ) {
    event.preventDefault();
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!dateFrom) missingFields.push("dateFrom");
    if (!dateTo) missingFields.push("dateTo");
    if (!location) missingFields.push("location");
    if (!category) missingFields.push("category");
    if (!status) missingFields.push("status");

    if (missingFields.length > 0) {
      alert(
        `Following Fields are missing❗❗:\n ${missingFields.map(
          (field, idx) => idx + 1 + ". " + field + "\n"
        )}`
      );
      return;
    }
    const data = {
      name,
      description,
      dateFrom,
      dateTo,
      location,
      category,
      status,
    };
    axios.post("http://localhost:3000/api/events", data).then((res) => {
      if (res.status === 201) {
        clearForm();
      }
    });
    setIsEditEventModalOpen(false);
  }

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={isEditEventModalOpen}
        onHide={() => setIsEditEventModalOpen(false)}
      >
        <Form
          onSubmit={(e) =>
            handleSubmit(e, {
              name,
              description,
              dateFrom,
              dateTo,
              location,
              category,
              status,
            })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "70vh", overflowY: "scroll" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brain dat Code"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 flex justify-between "
              controlId="exampleForm.ControlInput1"
            >
              <div className="flex flex-column w-[45%]">
                <Form.Label>From</Form.Label>
                <Form.Control
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  type="date"
                />
              </div>
              <div className="flex flex-column w-[45%]">
                <Form.Label>To</Form.Label>
                <Form.Control
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  type="date"
                />
              </div>
            </Form.Group>

            <Form.Group
              className="mb-3 flex justify-between"
              controlId="exampleForm.ControlInput1"
            >
              <div className="flex flex-column w-[45%]">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  as="textarea"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex flex-column w-[45%]">
                <div className="flex flex-column w-100 ">
                  <Form.Label>Choose</Form.Label>
                  <Dropdown className="mb-3 ">
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: "#55dd4a",
                        border: "none",
                        width: "100%",
                      }}
                      className="text-black"
                      id="dropdown-basic"
                    >
                      <span className="text-green-1000 font-bold">
                        {category ? category : "Select Category"}
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setCategory("Individual")}>
                        Individual
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setCategory("Team")}>
                        Team
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="w-100">
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: "#55dd4a",
                        border: "none",
                        width: "100%",
                      }}
                      className="text-black"
                      id="dropdown-basic"
                    >
                      <span className="text-green-1000 font-bold">
                        {status ? status : "Select Status"}
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => setStatus("Registrations Open")}
                      >
                        Registrations Open
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setStatus("Registrations Closed")}
                      >
                        Registrations Closed
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsEditEventModalOpen(false)}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Event
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
