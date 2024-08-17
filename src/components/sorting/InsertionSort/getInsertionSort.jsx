const getInsertionSort = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  selectionSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

const selectionSortHelper = (mainArray, startIdx, endIdx, animations) => {
  for (var i = 1; i <= endIdx; i++) {
    var key = mainArray[i];
    var j = i - 1;
    while (j >= 0 && mainArray[j] > key) {
      animations.push([j + 1, j]);
      animations.push([j + 1, j]);
      animations.push([j + 1, mainArray[j]]);
      mainArray[j + 1] = mainArray[j];
      j = j - 1;
    }
    animations.push([j + 1, i]);
    animations.push([j + 1, i]);
    animations.push([j + 1, key]);
    mainArray[j + 1] = key;
  }
};

export default getInsertionSort;
