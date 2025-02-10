const numOfSquareInput = document.getElementById(`num-squares-input`);
const createGridButton = document.getElementById(`create-grid-button`);
const gridContainer = document.getElementById(`grid-container`);


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

    gridContainer.innerHTML = '';

    for (let i = 1; i <= squareNum; i++) {

        const rowGrid = document.createElement(`div`);
        rowGrid.classList.add(`row-grid`);
        for (let j = 1; j <= squareNum; j++) {

            const squares = document.createElement(`div`);

            squares.classList.add(`squares`);
            squares.addEventListener(`mouseenter`, () => {

                if(colorType===`random-colors`) {
                    console.log(colorType);
                    squares.style.backgroundColor = `rgb(${ran(255)}, ${ran(255)}, ${ran(255)})`;
                } else {
                    console.log(colorType);
                    squares.style.backgroundColor = `black`;
                }

            });


            squares.addEventListener(`mouseout`, () => {
                console.log(fadeStyle);
                if(fadeStyle ===`fade`){
                    console.log(fadeStyle);
                    squares.style.backgroundColor = ``;
                } 
            });


            rowGrid.appendChild(squares);
        }
        gridContainer.appendChild(rowGrid);
    }
};

