import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">EntertainMe</Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/movies" className="mx-3">
          Movies
        </Link>
        <Link to="/tv" className="mx-3">
          Tv Series
        </Link>
        <Link to="/favorites" className="mx-3">
          My Favorite
        </Link>
      </Nav>
    </Navbar>
  );
}
