const numOfSquareInput = document.getElementById(`num-squares-input`);
const createGridButton = document.getElementById(`create-grid-button`);


const gridContainer = document.getElementById(`grid-container`);
// gridContainer.style.backgroundColor = `red`;

createGridButton.addEventListener(`click`, createGrid);

function createGrid() {

    if (numOfSquareInput.value < 1 || numOfSquareInput.value > 100) {
        alert(`Enter valid number: Min: 1, Max: 100`);
        return;
    }


    gridContainer.innerHTML = ''; 

    for(let i=1; i<=parseInt(numOfSquareInput.value); i++) {
        console.log(`creating grid row ${i}`);
        const rowGrid = document.createElement(`div`);
        rowGrid.classList.add(`row-grid`);
        for(let j=1; j<=parseInt(numOfSquareInput.value); j++) {
            console.log(`creating grid row ${j}`);
            const squares = document.createElement(`div`);
            // squares.textContent = 'i';
            squares.classList.add(`squares`);
            rowGrid.appendChild(squares);
        }
        gridContainer.appendChild(rowGrid);
    }
};