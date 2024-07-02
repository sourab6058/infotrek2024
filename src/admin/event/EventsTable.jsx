import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import EditEventModal from "./EditEventModal";

export default function EventsTable() {
  const [data, setData] = useState([]);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [rowChosen, setRowChosen] = useState(-1);

  function handleEdit(idx) {
    setRowChosen(idx);
    console.log(data[idx]);
    setIsEditEventModalOpen(true);
  }

  useEffect(() => {
    axios.get("http://localhost:3000/api/events").then((res) => {
      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    });
  }, []);
  return (
    <>
      <Table
        striped
        bordered
        hover
        style={{ width: "100%", maxHeight: "100vh", overflow: "scroll" }}
      >
        <thead>
          <tr>
            <th>Seq No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Location</th>
            <th>Cartegory</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                id,
                name,
                description,
                date_from,
                date_to,
                location,
                category,
                status,
              },
              idx
            ) => (
              <>
                <tr>
                  <td>{idx + 1}</td>
                  <td>{name}</td>
                  <td>{description.substring(0, 35)}</td>
                  <td>{new Date(date_from).toLocaleDateString()}</td>
                  <td>{new Date(date_to).toLocaleDateString()}</td>
                  <td>{location}</td>
                  <td>{category}</td>
                  <td>{status}</td>
                  <td>
                    <Button onClick={() => handleEdit(idx)}>Edit</Button>
                  </td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              </>
            )
          )}
        </tbody>
      </Table>
      <EditEventModal
        isEditEventModalOpen={isEditEventModalOpen}
        setIsEditEventModalOpen={setIsEditEventModalOpen}
        data={rowChosen > -1 ? data[rowChosen] : {}}
        rowChosen={rowChosen}
      />
    </>
  );
}
