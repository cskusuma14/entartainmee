import React, { useState } from "react";
import gql from "graphql-tag";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { GET_MOVIES } from "../pages/Home";
import { useHistory } from "react-router-dom";

const UPDATE_MOVIE = gql`
  mutation updateMovie($movieId: ID, $movie: InputMovie) {
    updateMovie(movieId: $movieId, movie: $movie) {
      title
    }
  }
`;

export default function UpdateForm(props) {
  // console.log(props);
  const history = useHistory();
  const [title, setTitle] = useState(props.movie.title);
  const [overview, setOverview] = useState(props.movie.overview);
  const [poster_path, setPosterPath] = useState(props.movie.poster_path);
  const [popularity, setPopularity] = useState(props.movie.popularity);
  const [tags, setTags] = useState(props.movie.tags);

  const [UpdateDataMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
    onCompleted: () => {
      history.push("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      overview,
      poster_path,
      popularity: Number(popularity),
      tags,
    };
    //console.log(newMovie);

    UpdateDataMovie({
      variables: { movieId: String(props.movie._id), movie: newMovie },
    });
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
                placeholder="Title Movie"
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
                placeholder="Overview movie"
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
            Update Movie
          </Button>
        </Form>
      </Container>
    </>
  );
}
