export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function partition(mainArray, low, high, animations) {
  var pivot = mainArray[high];
  var i = low - 1; //BECAUSE ONE ELEMENT IS TAKEN BY PIVOT
  for (var j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (mainArray[j] < pivot) {
      i++; // increment index of smaller element
      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([i, mainArray[j]]);
      var a = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = a;
    }
  }
  animations.push([i + 1, high]);
  animations.push([i + 1, high]);
  animations.push([i + 1, mainArray[high]]);
  var a = mainArray[i + 1];
  mainArray[i + 1] = mainArray[high];
  mainArray[high] = a;
  return i + 1;
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx <= endIdx) {
    var pi = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pi - 1, animations);
    quickSortHelper(mainArray, pi + 1, endIdx, animations);
  }
}
