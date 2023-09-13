import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon, imageUrl }) {
  return (
    <Link to={`/description/${pokemon.name}`}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>
          <Card.Text></Card.Text>
          <Button variant="primary">Get Details</Button>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default PokemonCard;
