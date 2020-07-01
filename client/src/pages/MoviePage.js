import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CardDeck, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Movie from "../components/Movie";

export const GET_MOVIES = gql`
  {
    movies {
      title
      overview
      poster_path
      popularity
      tags
      _id
    }
  }
`;

export default () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }

  return (
    <Container>
      <h1>List Movie</h1>
      <Button
        variant="dark"
        onClick={() => history.push(`/addMovie`)}
        className="my-3"
      >
        Add Movie
      </Button>

      <Container className="d-flex justify-content-md-center my-2">
        <CardDeck>
          {data.movies.map((movie) => {
            return <Movie key={movie._id} movie={movie} />;
          })}
        </CardDeck>
      </Container>
    </Container>
  );
};
