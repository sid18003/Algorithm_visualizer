import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Sorting from "./components/sorting/Sorting";
import Graph from "./components/graph/Graph";
import Tree from "./components/Tree/Tree";
import EquationSolve from "./components/EquationSolve/EquationSolve";
import NQueen from "./components/N-Queens-Problem/NQueens";
import Minesweeper from "./components/Minesweeper/Minesweeper";
import Game2048 from "./components/Game2048/Game2048";

const routes = [
  { path: "/", Component: Home },
  { path: "/sorting/:page", Component: Sorting },
  { path: "/graph/:page", Component: Graph },
  { path: "/tree/:page", Component: Tree },
  { path: "/equationsolve", Component: EquationSolve },
  { path: "/nqueen", Component: NQueen },
  { path: "/minesweeper", Component: Minesweeper },
  { path: "/game2048", Component: Game2048 },
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
