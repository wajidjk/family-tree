import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./pages/Homepage";
import AddNode from "./components/Modal";
import { Route, BrowserRouter } from "react-router-dom";
import { Fragment } from "react";

export const Main = () => {
  return (
    <Fragment>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/insert">
        <AddNode />
      </Route>
    </Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
