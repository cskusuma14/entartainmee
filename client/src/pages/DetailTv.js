import React from "react";
import { Container } from "react-bootstrap";
import DetailTvSerie from "../components/DetailTv";

export default function DetailTv() {
  return (
    <>
      <h1>Detail Tv Serie</h1>
      <Container className="d-flex justify-content-md-center my-2">
        <DetailTvSerie />
      </Container>
    </>
  );
}
