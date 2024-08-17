const getSelectionSort = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  selectionSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  console.log(array);
  return animations;
};

const selectionSortHelper = (
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) => {
  for (var i = startIdx; i <= endIdx; i++) {
    var min_id = i;
    for (var j = i + 1; j <= endIdx; j++) {
      if (mainArray[min_id] > mainArray[j]) {
        animations.push([i, j]);
        animations.push([i, j]);
        min_id = j;
        animations.push([i, mainArray[min_id]]);
      }
    }
    if (min_id != i) {
      var a = mainArray[i];
      mainArray[i] = mainArray[min_id];
      mainArray[min_id] = a;
    } else {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([i, mainArray[i]]);
    }
  }
  animations.push([endIdx, endIdx]);
  animations.push([endIdx, endIdx]);
  animations.push([endIdx, mainArray[endIdx]]);
};

export default getSelectionSort;
