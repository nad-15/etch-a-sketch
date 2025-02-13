const text = "Etch a Sketch";
const etchSketch = document.getElementById("etch-sketch");

etchSketch.innerHTML = text
  .split("")
  .map(letter => `<span style="color: ${getRandomColor()}">${letter}</span>`)
  .join("");

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`; // Vibrant colors
}


const clearGridColor = document.querySelector(`.clear-grid-colors`);
const numOfSquareInput = document.getElementById(`num-squares-input`);
const createGridButton = document.getElementById(`create-grid-button`);
const gridContainer = document.getElementById(`grid-container`);
const showGridLinesButton = document.querySelector(`.show-gridlines-button`);

console.log(numOfSquareInput.value);


const radioButtonsContainer = document.querySelector(`.user-choices`);

createGridButton.addEventListener('click', ()=>{
    radioButtonsContainer.classList.add(`disabled`);
    createGridButton.classList.add(`disabled`);
    gridContainer.classList.remove(`disabled`);
});

numOfSquareInput.addEventListener(`focus`, ()=>{
    radioButtonsContainer.classList.remove(`disabled`);
    createGridButton.classList.remove(`disabled`);
    gridContainer.classList.add(`disabled`);
});

// numOfSquareInput.addEventListener(`blur`, ()=>{
    radioButtonsContainer.classList.add(`disabled`);
    createGridButton.classList.add(`disabled`);
//     gridContainer.classList.remove(`disabled`);
// });

numOfSquareInput.addEventListener(`input`, ()=>{
    radioButtonsContainer.classList.remove(`disabled`);
    createGridButton.classList.remove(`disabled`);
    gridContainer.classList.add(`disabled`);


});

numOfSquareInput.addEventListener(`input`, ()=>{
    createGridButton.click();

    
});

let opacityValue = 1;
let a, b, c; // for rgb values



function getUserChoice() {
    const colorType = document.querySelector(`input[name="color-type"]:checked`);
    const fadeStyle = document.querySelector(`input[name="fade-style"]:checked`);
    const opacityChange = document.querySelector(`input[name="opacity"]:checked`);

    // if (!colorType || !fadeStyle || !opacityChange) {
    //     console.error('One or more radio buttons are not selected');
    //     return null;
    // }

    return {
        colorType: colorType.value,
        fadeStyle: fadeStyle.value,
        opacityChange: opacityChange.value
    };
}

createGrid(16, getUserChoice().colorType, getUserChoice().fadeStyle, getUserChoice().opacityChange);


// Attach event listener to the button for creating the grid
createGridButton.addEventListener('click', function () {


    const userChoice = getUserChoice();  // Call getUserChoice again when the button is clicked
    const squareNum = parseInt(numOfSquareInput.value);
    
    if (userChoice && squareNum >= 1 && squareNum <= 100) {
        createGrid(squareNum, userChoice.colorType, userChoice.fadeStyle, userChoice.opacityChange);
    } else {
        alert('Enter valid number: Min: 1, Max: 100');
    }


});


// const colors = [
//     "Red", "Blue", "Green", "Yellow", "Orange",
//     "Purple", "Cyan", "Magenta", "Pink", "Brown",
//     "Gray", "Teal", "Lime"
// ];


// function getRandomColor() {
//     const randomColor = Math.floor((Math.random() * 13));
//     console.log(randomColor);
//     return colors[randomColor];
// }


function ran(max) {
    return Math.floor(Math.random() * (max + 1));
}



function createGrid(squareNum, colorType, fadeStyle, opacityChange) {

    
    showGridLinesButton.textContent = "hide grid lines" ;
    
    showGridLinesButton.classList.toggle(`toggled`);
    //for random colors opaque change

    gridContainer.innerHTML = '';

    for (let i = 1; i <= squareNum; i++) {

        const rowGrid = document.createElement(`div`);
        rowGrid.classList.add(`row-grid`);
        for (let j = 1; j <= squareNum; j++) {

            const squares = document.createElement(`div`);

            squares.classList.add(`squares`);
            squares.addEventListener(`mouseenter`, (event) => {

                if (event.ctrlKey) {



                if (colorType === `random-colors`) {

                    if (opacityChange === `steady-opaq`) {
                        squares.style.backgroundColor = `rgb(${ran(255)}, ${ran(255)}, ${ran(255)})`;
                    } else {

                        if(opacityValue == 1) {
                            a = ran(255);
                            b = ran(255);
                            c = ran(255);
                            console.log(`color change`);
                        }

                        squares.style.backgroundColor = `rgb(${a}, ${b}, ${c} , ${getOpacityValue()})`;
                        // console.log(`set new color`);



                    }
                    // console.log(colorType);


                } else if (colorType === `black`){
                    console.log(colorType);
                    if (opacityChange === `steady-opaq`) {
                        squares.style.backgroundColor = `rgba(0, 0, 0)`;
                    } else {
                        squares.style.backgroundColor = `rgba(0, 0, 0, ${getOpacityValue()})`;
                    }
                }

                // squares.style.transition = `background-color 0s ease-out;`

            }        });

            //



            squares.addEventListener(`mouseout`, () => {
                if (fadeStyle === `fade`) {
                    // console.log(fadeStyle);
                    squares.style.backgroundColor = ``;

                    // squares.style.transition = `background-color 1s ease-out;`
                }

            });


            rowGrid.appendChild(squares);
        }
        gridContainer.appendChild(rowGrid);
    }
};

function getOpacityValue() {
    opacityValue += 0.1;

    if (opacityValue > 1) {
        opacityValue = 0.1;
    }

    // Round the opacity value to 1 decimal place
    opacityValue = parseFloat(opacityValue.toFixed(1));

    console.log(`Opacity value is ${opacityValue}`);
    return opacityValue;
}

showGridLinesButton.addEventListener(`click`, () => {
    const squares = gridContainer.querySelectorAll('.squares');

    squares.forEach(square => {
        square.classList.toggle('no-grid-lines');
    });

    // showGridLinesButton.classList.toggle(`toggled`);
    showGridLinesButton.textContent = 
        showGridLinesButton.textContent === "show grid lines" 
            ? "hide grid lines" 
            : "show grid lines";
});


clearGridColor.addEventListener(`click`, ()=>{
    const squares = gridContainer.querySelectorAll('.squares');

    squares.forEach(square => {
        square.style.backgroundColor = ``;
    });
});
