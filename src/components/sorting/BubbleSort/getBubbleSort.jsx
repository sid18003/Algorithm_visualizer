const getBubbleSort = (array) => {
  const animations = [];
  console.log(array);
  if (array.length <= 1) return array;
  selectionSortHelper(array, 0, array.length - 1, animations);
  console.log(array);
  return animations;
};

const selectionSortHelper = (mainArray, startIdx, endIdx, animations) => {
  for (var i = startIdx; i <= endIdx; i++) {
    for (var j = startIdx; j <= endIdx - i; j++) {
      if (mainArray[j] > mainArray[j + 1]) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j, mainArray[j + 1]]);
        var a = mainArray[j];
        mainArray[j] = mainArray[j + 1];
        mainArray[j + 1] = a;
      } else {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([j, mainArray[j]]);
      }
    }
  }
  animations.push([endIdx, endIdx]);
  animations.push([endIdx, endIdx]);
  animations.push([endIdx, mainArray[endIdx]]);
};

export default getBubbleSort;
