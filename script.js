const numOfSquareInput = document.getElementById(`num-squares-input`);
const createGridButton = document.getElementById(`create-grid-button`);
const gridContainer = document.getElementById(`grid-container`);




// gridContainer.style.backgroundColor = `red`;

createGrid(16);

createGridButton.addEventListener('click', function () {


    const colorType = document.querySelector(`input[name="color-type"]:checked`);
    console.log(colorType.value);
    const fadeStyle = document.querySelector(`input[name="fade-style"]:checked`);
    console.log(fadeStyle.value);
    const opacityChange = document.querySelector(`input[name="opacity"]:checked`);
    console.log(opacityChange.value);
    const squareNum = parseInt(numOfSquareInput.value);
    // Only create grid if squareNum is a valid number
    if (squareNum >= 1 && squareNum <= 100) {
        createGrid(squareNum);
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



function createGrid(squareNum) {

    gridContainer.innerHTML = '';

    for (let i = 1; i <= squareNum; i++) {

        const rowGrid = document.createElement(`div`);
        rowGrid.classList.add(`row-grid`);
        for (let j = 1; j <= squareNum; j++) {

            const squares = document.createElement(`div`);

            squares.classList.add(`squares`);
            squares.addEventListener(`mouseenter`, () => {
                squares.style.backgroundColor = `rgb(${ran(255)}, ${ran(255)}, ${ran(255)})`;
            });


            squares.addEventListener(`mouseout`, () => {
                // squares.style.backgroundColor = ``;
            });


            rowGrid.appendChild(squares);
        }
        gridContainer.appendChild(rowGrid);
    }
};

