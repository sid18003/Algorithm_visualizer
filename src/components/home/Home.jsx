import React from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const data = {
    "Sorting Visualizer": [
      ["/sorting/mergesort", "Mergesort"],
      ["/sorting/selectionsort", "Selectionsort"],
      ["/sorting/bubblesort", "Bubblesort"],
      ["/sorting/insertionsort", "Insertionsort"],
      ["/sorting/quicksort", "Quicksort"],
    ],
    "Graph Visualizer": [
      ["/graph/breadthfirstsearch", "Breadth First Search"],
      ["/graph/depthfirstsearch", "Depth First Search"],
      ["/graph/minimumcostpath", "Minimum Cost Path"],
    ],
    "General Problems": [
      ["/equationsolve", "Equation Solver"],
      ["/nqueen", "N-Queen Problem"],
      ["/minesweeper", "Minesweeper Game"],
      ["/game2048", "2048 Game"],
    ],
    "Tree Visualizer": [
      ["/tree/preordertraversal", "Preorder Traversal"],
      ["/tree/inordertranversal", "Inorder Traversal"],
      ["/tree/postordertraversal", "PostOrder Traversal"],
    ],
  };
  return (
    <div className={classes.home}>
      <div className={classes.heading_top}>DSA Visualizer</div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className={classes.each_object}>
          <div className={classes.heading}>{key}</div>
          <div className={classes.navbar}>
            <div className={classes.nav}>
              {value.map((navitem, index) => (
                <Link to={navitem[0]} className={classes.navItem} key={index}>
                  {navitem[1]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
