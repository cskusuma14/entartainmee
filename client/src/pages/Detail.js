import React from "react";
import { Container } from "react-bootstrap";
import DetailMovie from "../components/DetailMovie";

export default function Detail() {
  return (
    <>
      <h1>Detail Movie</h1>
      <Container className="d-flex justify-content-md-center my-2">
        <DetailMovie />
      </Container>
    </>
  );
}
