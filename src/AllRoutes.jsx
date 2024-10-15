import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
 import Graph from "./components/graph/Graph";
import Tree from "./components/Tree/Tree";
 
const routes = [
  { path: "/", Component: Home },
   { path: "/graph/:page", Component: Graph },
  { path: "/tree/:page", Component: Tree },
 ];

export const AllRoutes = () => (
  <Routes>
    {routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={<route.Component />}
      ></Route>
    ))}
  </Routes>
);
