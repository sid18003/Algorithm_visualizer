import React from "react";
import clssses from "./Graph.module.css";
import { useParams } from "react-router-dom";
import BreadthFirstSearch from "./BreadthFirstSearch/BreadthFirstSearch";
import DepthFirstSearch from "./DepthFirstSearch/DepthFirstSearch";
import MinimumCostPath from "./MinimumCostPath/MinimumCostPath";

const Graph = () => {
  const { page } = useParams();
  return (
    <div className={clssses.Big_container}>
      {page == "breadthfirstsearch" && <BreadthFirstSearch />}
      {page == "depthfirstsearch" && <DepthFirstSearch />}
      {page == "minimumcostpath" && <MinimumCostPath />}
    </div>
  );
};

export default Graph;
