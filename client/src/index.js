import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import List from "./list";
import Home from "./home";
import CountDown from "./countDown";
import Map from "./map";
import Pics from "./pics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/pics",
    element: <Pics />,
  },
  {
    path: "/countDown",
    element: <CountDown />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
