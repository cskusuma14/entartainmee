import React from "react";
import gql from "graphql-tag";
import { CardDeck, Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

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

export default function DetailMovie() {
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
    <>
      <CardDeck style={{ width: "500px" }}>
        <Card>
          <Card.Img
            style={{ width: "auto", height: "400px" }}
            variant="top"
            src={data.movie.poster_path}
          />
          <Card.Body>
            <Card.Title>{data.movie.title}</Card.Title>
            <Card.Text>{data.movie.overview}</Card.Text>
            <Card.Text>Popularity : {data.movie.popularity}</Card.Text>
            <Card.Text>
              {data.movie.tags.map((tag, idx) => (
                <Badge pill className="mx-2" variant="info" key={idx}>
                  {tag}
                </Badge>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </>
  );
}
