import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_MOVIES } from "../pages/Home";
import { GET_FAVORITES } from "../pages/Favorites";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const DELETE_MOVIE = gql`
  mutation deleteMovie($movieId: ID) {
    deleteMovie(movieId: $movieId) {
      title
    }
  }
`;

const ADD_TOFAVORITES = gql`
  mutation addToFavorites($movie: dataMovie) {
    addToFavorites(movie: $movie) @client {
      title
      popularity
    }
  }
`;

export default function Movie(props) {
  const { loading, error, data } = useQuery(GET_FAVORITES);
  const history = useHistory();
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });
  const [addToFavorites] = useMutation(ADD_TOFAVORITES);

  function deleteItem(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMovie({ variables: { movieId: id } });
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  }

  function addFav(dataFav) {
    let check = true;
    for (let i = 0; i < data.favorites.length; i++) {
      if (data.favorites[i]._id == dataFav._id) check = false;
      break;
    }
    if (check) {
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          addToFavorites({ variables: { movie: dataFav } });
          swal("Success!", {
            icon: "success",
          });
        } else {
          swal("Cancel");
        }
      });
    } else {
      swal({
        title: "Already in Favorites",
        icon: "error",
      });
    }
  }

  return (
    <>
      <Row>
        <Col>
          <Card sm={4} md={3} lg={3} className="my-2">
            <Card.Img
              style={{ width: "auto", height: "300px" }}
              variant="top"
              src={props.movie.poster_path}
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
            <Card.Footer>
              <Button
                variant="dark"
                onClick={() => deleteItem(props.movie._id)}
              >
                Delete
              </Button>
              <Button
                variant="dark"
                onClick={() =>
                  history.push(`/movies/${props.movie._id}/update`)
                }
                className="mx-3"
              >
                Edit
              </Button>
              <Button variant="dark" onClick={() => addFav(props.movie)}>
                Add To Favorites
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}
