import React from "react";
import { Container } from "react-bootstrap";
import UpdateTvSerie from "../components/UpdateTv";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";

const GET_TVSERIE = gql`
  query tvSerie($tvId: ID) {
    tvSerie(tvId: $tvId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
export default function UpdateTv() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_TVSERIE, {
    variables: { tvId: String(id) },
  });
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }

  return (
    <Container>
      <h1>Update Tv Serie</h1>
      <UpdateTvSerie movie={data.tvSerie} />
    </Container>
  );
}
