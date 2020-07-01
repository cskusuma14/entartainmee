import React from "react";
import { Container } from "react-bootstrap";
import UpdateForm from "../components/UpdateForm";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query movie($movieId: ID) {
    movie(movieId: $movieId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
export default function Update() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { movieId: String(id) },
  });
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }

  return (
    <Container>
      <h1>Update Movie</h1>
      <UpdateForm movie={data.movie} />
    </Container>
  );
}
