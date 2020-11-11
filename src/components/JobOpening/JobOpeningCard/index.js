import React from "react";
import { Card } from "react-bootstrap";

export const JobOpeningCard = (props) => {
  return (
    <Card style={{ width: "20rem", margin:"10px"}}>
      <Card.Img
        variant="top"
        style={{ padding: "0.5rem", filter: "opacity(85%)" }}
        src="http://lorempixel.com/400/250/abstract"
      />
      <Card.Body>
        <Card.Title as="h3" className="mb-4">
          {props.item.title}
        </Card.Title>
        <Card.Text className="text-secondary text-wrap text-truncate" style={{ height: "7.5rem" }}>
          {props.item.position}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <button className="btn btn-info w-75">Ver Oferta</button>
      </Card.Footer>
    </Card>
  );
};
