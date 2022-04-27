import React from "react";
import { ListGroup } from "react-bootstrap";

const Sidybar = () => {
  const rooms = ["first room", "second room", "third room"];
  return (
    <>
      <h2>Available Room</h2>
      <ListGroup>
        {rooms.map((room, i) => (
          <ListGroup.Item key={i}>{room}</ListGroup.Item>
        ))}
      </ListGroup>{" "}
      <h2>Members</h2>
    </>
  );
};

export default Sidybar;
