import React, { useEffect, useState } from "react";
import classes from "../Tree.module.css";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import { getpreordertraversal } from "./getPreorderTraversal";
import TreeNode from "../TreeNode";

const PreorderTraversal = () => {
  const [tree, setTree] = useState([]);
  const [regenerate, setRegenerate] = useState(0);
  const ANIMATION_SPEED = 500;
  const traversal = "preorder";

  useEffect(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let prevLetter = null;
    var Final_array = [];
    for (var i = 0; i < 4; i++) {
      var Each_Row = [];
      for (var j = 0; j < Math.pow(2, i); j++) {
        let letter = null;
        while (!letter || (prevLetter && prevLetter.includes(letter))) {
          letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        prevLetter += letter;
        Each_Row.push(letter);
        if (tree.length != 0)
          document.getElementById(`${i}-${j}-${traversal}`).className =
            "common row_each_Element";
      }
      Final_array.push(Each_Row);
    }
    setTree(Final_array);
  }, [regenerate]);

  const GenerateTree = () => {
    setRegenerate((regenerate) => ++regenerate);
  };

  const preordertraversal = () => {
    const animation = getpreordertraversal(tree);
    for (var i = 0; i < animation.length; i++) {
      const new_I = i;
      setTimeout(() => {
        document.getElementById(
          `${animation[new_I][0]}-${animation[new_I][1]}-${traversal}`
        ).className = "common visited";
      }, ANIMATION_SPEED * i);
    }
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.heading}>PreorderTraversal</div>
      <div className={classes.Trees}>
        {tree.map((row, index) => (
          <div key={index} className={classes.row}>
            {row.map((element, element_index) => (
              <TreeNode
                key={element_index}
                row={index}
                col={element_index}
                element={element}
                traversal={traversal}
              ></TreeNode>
            ))}
          </div>
        ))}
      </div>
      <div className={classes.button}>
        <Button
          onClick={() => {
            GenerateTree();
          }}
        >
          Generate Tree
        </Button>
        <Button
          onClick={() => {
            preordertraversal();
          }}
        >
          Preorder Traversal
        </Button>
      </div>
    </div>
  );
};

export default PreorderTraversal;
