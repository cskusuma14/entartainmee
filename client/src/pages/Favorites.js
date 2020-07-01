import React from "react";
import gql from "graphql-tag";
import { CardDeck, Container, Card, Badge, Row, Col } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

export const GET_FAVORITES = gql`
  query {
    favorites @client {
      _id
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`;
export default () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_FAVORITES);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }
  return (
    <Container>
      <h1>My Favorite</h1>
      {/* {JSON.stringify(data)} */}
      <Container className="d-flex justify-content-md-center my-2">
        <CardDeck>
          {data.favorites.map((favorite, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Card sm={4} md={3} lg={3} className="my-2">
                    <Card.Img
                      style={{ width: "auto", height: "300px" }}
                      variant="top"
                      src={favorite.poster_path}
                      onClick={() => history.push(`/movies/${favorite._id}`)}
                    />
                    <Card.Body>
                      <Card.Title>{favorite.title}</Card.Title>
                      <Card.Text>{favorite.overview}</Card.Text>
                      <Card.Text>Popularity : {favorite.popularity}</Card.Text>
                      <Card.Text>
                        {favorite.tags.map((tag, idx) => (
                          <Badge pill className="mx-2" variant="info" key={idx}>
                            {tag}
                          </Badge>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </CardDeck>
      </Container>
    </Container>
  );
};
