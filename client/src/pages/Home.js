import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CardDeck, Container, Row } from "react-bootstrap";
import Home from "../components/Home";

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

export const GET_ALL = gql`
  {
    getAll {
      movies {
        title
        overview
        poster_path
        popularity
        tags
        _id
      }
      tvSeries {
        title
        overview
        poster_path
        popularity
        tags
        _id
      }
    }
  }
`;

export default () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL);
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }

  return (
    <>
      <h1>List Movie</h1>
      <Container className="d-flex justify-content-md-center my-2">
        <CardDeck>
          {data.getAll.movies.map((movie) => {
            return <Home key={movie._id} movie={movie} />;
          })}
        </CardDeck>
      </Container>

      <h1>List Tv Series</h1>
      <Container className="d-flex justify-content-md-center my-2">
        <CardDeck>
          <Row>
            {data.getAll.tvSeries.map((movie) => {
              return <Home key={movie._id} movie={movie} />;
            })}
          </Row>
        </CardDeck>
      </Container>
    </>
  );
};
