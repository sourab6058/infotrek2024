import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { v4 as uuidv4 } from "uuid";

import EditEventModal from "./EditEventModal";

import { eventApi } from "../../../api";

export default function EventsTable() {
  const [data, setData] = useState([]);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [rowChosen, setRowChosen] = useState(-1);

  function handleEdit(idx) {
    setRowChosen(idx);
    setIsEditEventModalOpen(true);
  }

  function handleDelete(id) {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      alert("You are not authorized.");
      return;
    }
    let confirmAction = confirm(
      "❗❗Are you sure you want to DELETE THE EVENT?❗❗"
    );

    if (confirmAction) {
      axios
        .delete(`${eventApi}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload(false);
          }
        });
    }
  }

  useEffect(() => {
    axios.get(`${eventApi}`).then((res) => {
      if (res.status === 200) {
        setData(res.data);
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
            <th key={uuidv4()}>Seq No</th>
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
                <tr key={id}>
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
                    <Button variant="danger" onClick={() => handleDelete(id)}>
                      Delete
                    </Button>
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
        setData={setData}
        fullData={data}
        rowChosen={rowChosen}
      />
    </>
  );
}
