import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CardDeck, Container, Button } from "react-bootstrap";
import TvSeries from "../components/TvSeries";
import { useHistory } from "react-router-dom";

export const GET_TVSERIES = gql`
  {
    tvSeries {
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
  const { loading, error, data } = useQuery(GET_TVSERIES);
  //console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }

  return (
    <Container>
      <h1>Tv Series</h1>
      <Button
        variant="dark"
        onClick={() => history.push(`/addTvSerie`)}
        className="my-3"
      >
        Add Tv Serie
      </Button>
      <Container className="d-flex justify-content-md-center my-2">
        <CardDeck>
          {data.tvSeries.map((tvSerie) => {
            return <TvSeries key={tvSerie._id} movie={tvSerie} />;
          })}
        </CardDeck>
      </Container>
    </Container>
  );
};
