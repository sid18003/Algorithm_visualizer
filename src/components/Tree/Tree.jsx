import React from "react";
import clssses from "./Tree.module.css";
import { useParams } from "react-router-dom";
import PreorderTraversal from "./Preorder/PreorderTraversal";
import PostorderTraversal from "./Postorder/PostorderTraversal";
import InorderTranversal from "./Inorder/InorderTranversal";

const Tree = () => {
  const { page } = useParams();
  return (
    <div className={clssses.Big_container}>
      {page == "preordertraversal" && <PreorderTraversal />}
      {page == "postordertraversal" && <PostorderTraversal />}
      {page == "inordertranversal" && <InorderTranversal />}
    </div>
  );
};

export default Tree;
