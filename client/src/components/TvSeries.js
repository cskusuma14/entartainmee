import React from "react";
import { Card, Button, Col, Row, Badge } from "react-bootstrap";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { GET_TVSERIES } from "../pages/TvSeriesPage";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const DELETE_TV = gql`
  mutation deleteTvSerie($tvId: ID) {
    deleteTvSerie(tvId: $tvId) {
      title
    }
  }
`;

export default function TvSeries(props) {
  const history = useHistory();
  const [deleteTv] = useMutation(DELETE_TV, {
    refetchQueries: [{ query: GET_TVSERIES }],
  });

  function deleteItem(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTv({ variables: { tvId: id } });
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
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
              onClick={() => history.push(`/tv/${props.movie._id}`)}
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
                onClick={() => history.push(`/tv/${props.movie._id}/update`)}
                className="mx-3"
              >
                Edit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}
