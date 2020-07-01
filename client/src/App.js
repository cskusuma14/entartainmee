import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import client from "./services/graphql";
import "./App.css";
import {
  Home,
  AddMovie,
  Detail,
  Update,
  TvSeriesPage,
  AddTvSerie,
  DetailTv,
  UpdateTv,
  Favorites,
  MoviePage,
} from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Navbar></Navbar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/addMovie">
              <AddMovie />
            </Route>
            <Route path="/addTvSerie">
              <AddTvSerie />
            </Route>
            <Route path="/movies/:id/update">
              <Update />
            </Route>
            <Route path="/tv/:id/update">
              <UpdateTv />
            </Route>
            <Route path="/movies/:id">
              <Detail />
            </Route>
            <Route path="/tv/:id">
              <DetailTv />
            </Route>
            <Route path="/tv">
              <TvSeriesPage />
            </Route>
            <Route path="/movies">
              <MoviePage />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
