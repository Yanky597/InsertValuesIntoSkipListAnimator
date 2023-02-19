// https://cmps-people.ok.ubc.ca/ylucet/DS/SkipList.html

let valueSet = null; // is used to determine if we should increase the canvas width

const header = document.querySelector("#header");
let currentDiv;

if (document.querySelector("#header>div") == null) {
  currentDiv = document.createElement("div");
  currentDiv.appendChild(document.createTextNode("VALUES IN SKIP LIST : "));
  header.appendChild(currentDiv);
} else {
  currentDiv = document.querySelector("#header>div");
}

/*
    References to the HTML elements we need.
*/

const input = document.querySelector(
  "#AlgorithmSpecificControls > td:nth-child(5) > input[type=Text]"
);
const insertButton = document.querySelector(
  "#AlgorithmSpecificControls > td:nth-child(2) > input[type=Button]"
);

const canvasWidth = document.querySelector(
  "#GeneralAnimationControls > td:nth-child(8) > input[type=Text]"
);

const canvasHeight = document.querySelector(
  "#GeneralAnimationControls > td:nth-child(10) > input[type=Text]"
);

const changeCanvasSizeButton = document.querySelector(
  "#GeneralAnimationControls > td:nth-child(11) > input[type=Button]"
);

const resetCanvasWidth = () => {
  if (document.querySelectorAll("#header>div>span").length < 1) {
    canvasWidth.value = 1000;
    canvasHeight.value = 500;
    changeCanvasSizeButton.click();
  }
};

/* 
    Inserts the values into the skip list on a timer, 
    I have not played around with the amount of times
    between the program being run and not but this timing
    did work well. I did not have any issues/inconsistencies
*/

const insertValuesIntoSkipList = (arr, numSet) => {
  let currentValue;
  let interval = setInterval(function () {
    if (!input.disabled) {
      currentValue = arr.pop();
      initiateAnimation(currentValue);
      displayCurrentValue(currentValue);
      updateCanvasSize(currentValue, numSet);

      // exit the loop
      if (arr.length == 0) {
        clearInterval(interval);
      }
    }
  }, 500);
};

/*
    Displays a running list of all the values that have been added to 
    the skip list. The current value being inserted is highlighted in red
*/
const displayCurrentValue = (val) => {
  let openingTag = `<span style="color:red;font-weight: bold; font-size:large;">`;
  let closingTag = `</span>`;
  let comma = `<span>, </span>`;
  try {
    let previousValues = document.querySelectorAll("#header>div>span");
    for (let i = 0; i < previousValues.length; i++) {
      previousValues[i].style.color = "inherit";
      previousValues[i].style.fontWeight = "normal";
      previousValues[i].style.fontSize = "medium";
    }
    if (document.querySelectorAll("#header>div>span").length < 1) {
      /*
        Creates a div in the header that will display the values
        we are inserting into the skip list.
      */
      currentDiv.innerHTML += openingTag + val + closingTag;
      return;
    }
    currentDiv.innerHTML += comma + openingTag + val + closingTag;
  } catch (error) {
    console.log(error);
  }
};

/* 
    As more nodes are inserted into the document the canvas size
    needs to expand. Initial canvas can fit 13 nodes (wide) and the size is increased 
    gradually past that amount of nodes. Height is increased very slightly with every
    insertion as it is unpredictable.
*/

const updateCanvasSize = (currentValue, numSet) => {
  if (numSet.size > 12 && !numSet.has(currentValue)) {
    canvasWidth.value = (parseInt(canvasWidth.value) + 100).toString();
    canvasHeight.value = (parseInt(canvasHeight.value) + 5).toString();
  } else if (!numSet.has(currentValue)) {
    canvasHeight.value = (parseInt(canvasHeight.value) + 5).toString();
  }
  numSet.add(currentValue);
  changeCanvasSizeButton.click();
};

/*
  initiateAnimation handles getting the value from the input box
  and initializes the animation of the insertion into the list  
*/

const initiateAnimation = (currentValue) => {
  input.value = currentValue;
  insertButton.click();
};

/*
    The assumption is that the first
    round of insertions will want to be spread out
    so that you can better demonstrate values being inserted 
    between other values
*/
const getArrayWithInitialRangeValues = (maxValue, step) => {
  let arr = [];
  for (let i = 0; i < maxValue; i += step) {
    arr.push(i);
  }
  return arr;
};

/* 
    NOTE : The website will only allow for integer input, no floating point numbers
*/

const getArrayOfRandomValuesInRange = (maxValue, amountOfValues) => {
  let arr = [];
  for (let i = 0; i < amountOfValues; i++) {
    arr.push(Math.floor(Math.random() * maxValue) + 1);
  }
  return arr;
};

let main = () => {
  let maxValue = 100;
  let step = 10; // distance between nodes we initially put in the skip list
  let amountOfRandomValues = 20;
  valueSet = valueSet == null ? new Set() : valueSet;
  resetCanvasWidth();
  let InitialList = getArrayWithInitialRangeValues(maxValue, step);
  insertValuesIntoSkipList(InitialList, valueSet);
  let secondList = getArrayOfRandomValuesInRange(
    maxValue,
    amountOfRandomValues
  );
  insertValuesIntoSkipList(secondList, valueSet);
};

main();
