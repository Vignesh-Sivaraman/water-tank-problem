let form = document.getElementById("uservalues");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputTable = document.getElementById("inputTable");
  let outputTable = document.getElementById("outputTable");
  let outputUnits = document.getElementById("units");
  inputTable.innerHTML = "";
  outputTable.innerHTML = "";
  let arrayString = document.getElementById("arrayvalues").value;
  // converting string to array
  arrayString = arrayString.split(",").map(Number);
  let columns = arrayString.length;
  let rows = Math.max(...arrayString) + 1;
  // creating table based on input
  createTable(inputTable, rows, columns, "yellow", arrayString);
  let [output, units] = getWater(arrayString);
  columns = output.length;
  rows = Math.max(...output) + 1;
  // creating table based on output
  createTable(outputTable, rows, columns, "blue", output);
  outputUnits.innerHTML = `Total water = ${units} units`;
});

// This is a function to get the total Water units
function getWater(arr) {
  let minValue = [];
  let previous = arr[0];
  let totalUnits = 0;

  // looping to find out the minimum values of the two non-gap block (This way we can avoid O(n^2))
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== 0) {
      previous = arr[i];
    } else if (arr[i] === 0 && i !== arr.length - 1) {
      if (arr[i + 1] !== 0) {
        minValue.push(Math.min(previous, arr[i + 1]));
        previous = arr[i + 1];
        i = i + 1;
      }
    }
  }
  var lastZeroIndex;
  let index = 0;
  arr[0] = 0;

  // looping to replace the minimum values in the original array
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === 0 && i !== arr.length - 1) {
      if (lastZeroIndex && Math.abs(i - lastZeroIndex) > 1) {
        index++;
        lastZeroIndex = i;
      }
      lastZeroIndex = i;
      if (minValue[index]) {
        totalUnits += minValue[index];
        arr[i] = minValue[index];
      }
    } else {
      arr[i] = 0;
    }
  }
  return [arr, totalUnits];
}

// This is a function to create table
function createTable(tablename, rows, columns, colour, output) {
  for (let r = 0; r < rows; r++) {
    let currentRow = tablename.insertRow(r);
    for (let c = 0; c < columns; c++) {
      let cellX = rows - r;
      let cellY = output[c];
      let currentColumn = currentRow.insertCell(c);
      //   currentColumn.innerHTML = "Row-" + r + " Column-" + c;
      if (cellX <= cellY) {
        currentColumn.style.backgroundColor = colour;
      }
    }
  }
}
