import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";

function EventCard() {
  const [timeLeft, setTimeLeft] = useState(100);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
      console.log("hello");
    }, 1000);
    return clearInterval(timeInterval);
  });
  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Register Now!</Button>
        <Alert key={"timer" + uuidv4()} variant={"success"}>
          {timeLeft}
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
