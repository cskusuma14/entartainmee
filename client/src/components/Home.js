import React from "react";
import { Card, Col, Image, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home(props) {
  const history = useHistory();

  return (
    <>
      <Col sm={4} md={3} lg={3} className="my-2">
        <Image
          //   style={{ width: "auto", height: "300px" }}
          variant="top"
          src={props.movie.poster_path}
          fluid
          className="card"
          onClick={() => history.push(`/movies/${props.movie._id}`)}
        />
        <Card.Body>
          <Card.Title>{props.movie.title}</Card.Title>
          <Card.Text>Popularity : {props.movie.popularity}</Card.Text>
          <Card.Text>
            {props.movie.tags.map((tag, idx) => (
              <Badge pill className="mx-2" variant="info" key={idx}>
                {tag}
              </Badge>
            ))}
          </Card.Text>
        </Card.Body>
      </Col>
    </>
  );
}
