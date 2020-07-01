import React, { useState } from "react";
import gql from "graphql-tag";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { GET_TVSERIES } from "../pages/TvSeriesPage";
import { useHistory } from "react-router-dom";

const ADD_TVSERIES = gql`
  mutation addTvSerie($tvSerie: InputTvSerie) {
    addTvSerie(tvSerie: $tvSerie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default function FormTvSerie() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPosterPath] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState("");

  const [newDataTvSerie] = useMutation(ADD_TVSERIES, {
    refetchQueries: [{ query: GET_TVSERIES }],
    onCompleted: () => {
      history.push("/tv");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTvSerie = {
      title,
      overview,
      poster_path,
      popularity: Number(popularity),
      tags,
    };
    // console.log(newTvSerie);

    newDataTvSerie({ variables: { tvSerie: newTvSerie } });
  };

  return (
    <>
      <Container className="my-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Title Tv Serie"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalOverview">
            <Form.Label column sm={2}>
              Overview
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Overview Tv Serie"
                required
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPosterPath">
            <Form.Label column sm={2}>
              Poster Path
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Url poster"
                required
                value={poster_path}
                onChange={(e) => setPosterPath(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPopularity">
            <Form.Label column sm={2}>
              Popularity
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                placeholder="Popularity"
                required
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTags">
            <Form.Label column sm={2}>
              Tags
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Tags separated by comma"
                required
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="dark" type="submit">
            Add New TV Serie
          </Button>
        </Form>
      </Container>
    </>
  );
}
