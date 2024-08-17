import React from "react";
import clssses from "./Sorting.module.css";
import { useParams } from "react-router-dom";
import MergeSort from ".//MergeSort/MergeSort";
import SelectionSort from ".//SelectionSort/SelectionSort";
import BubbleSort from ".//BubbleSort/BubbleSort";
import InsertionSort from ".//InsertionSort/InsertionSort";
import QuickSort from ".//QuickSort/QuickSort";

const Sorting = () => {
  const { page } = useParams();
  return (
    <div className={clssses.container}>
      {page == "mergesort" && <MergeSort />}
      {page == "selectionsort" && <SelectionSort />}
      {page == "bubblesort" && <BubbleSort />}
      {page == "insertionsort" && <InsertionSort />}
      {page == "quicksort" && <QuickSort />}
    </div>
  );
};

export default Sorting;
