const clearGridColor = document.querySelector(`.clear-grid-colors`);
const numOfSquareInput = document.getElementById(`num-squares-input`);
const createGridButton = document.getElementById(`create-grid-button`);
const gridContainer = document.getElementById(`grid-container`);
const showGridLinesButton = document.querySelector(`.show-gridlines-button`);
const colorPicker = document.getElementById(`colorPicker`);
const opacityRadios = document.querySelectorAll('input[name="opacity"]');
const radioButtonsContainer = document.querySelector(`.user-choices`);
const colorRadios = document.querySelectorAll('input[name="color-type"]');

//initialize grid and listeners
createGrid(16);
attachSquareEvents();


createGridButton.addEventListener('click', function () {
    const squareNum = parseInt(numOfSquareInput.value);

    if (squareNum >= 1 && squareNum <= 200) {
        createGrid(squareNum);
        attachSquareEvents();
    } else {
        alert('Enter valid number: Min: 1, Max: 100');
    }
});


function createGrid(squareNum) {
    showGridLinesButton.textContent = "hide grid lines";
    showGridLinesButton.classList.toggle(`toggled`);
    gridContainer.innerHTML = '';

    for (let i = 1; i <= squareNum; i++) {
        const rowGrid = document.createElement(`div`);
        rowGrid.classList.add(`row-grid`);
        for (let j = 1; j <= squareNum; j++) {
            const squares = document.createElement(`div`);
            squares.classList.add(`squares`);
            rowGrid.appendChild(squares);
        }
        gridContainer.appendChild(rowGrid);
    }
};

function attachSquareEvents() {

    const squares = document.querySelectorAll(`.squares`);
    squares.forEach(square => {
        let opacity;
        square.dataset.opacity = 0.0;

        square.addEventListener(`mouseenter`, (event) => {
            let r, g, b;
            const colorType = document.querySelector(`input[name="color-type"]:checked`).value;
            let opacityChange = document.querySelector(`input[name="opacity"]:checked`);

            if (colorType === 'black') {
                // Black color option
                r = 0;
                g = 0;
                b = 0;
                // color = 'rgb(0, 0, 0,)';
            } else if (colorType === 'random-colors') {
                if (opacityChange?.value === 'increase-opaq') {
                    r = parseInt(square.dataset.r) || ran(255);
                    g = parseInt(square.dataset.g) || ran(255);
                    b = parseInt(square.dataset.b) || ran(255);
                } else {
                    // Random colors option
                    r = ran(255);
                    g = ran(255);
                    b = ran(255);
                    // color = `rgb(${ran(255)}, ${ran(255)}, ${ran(255)})`;
                }


            } else if (colorType === 'custom') {
                // Custom color option
                // color = colorPicker.value;
                const { r: red, g: green, b: blue } = hexToRgb(colorPicker.value);
                r = red;
                g = green;
                b = blue;
            }

            //saving r g b for random colors with opacity change
            square.dataset.r = r;
            square.dataset.g = g;
            square.dataset.b = b;


            //start drawing by holding shift key
            if (event.shiftKey) {
                if (opacityChange?.value === 'increase-opaq') {
                    let currentOpacity = parseFloat(square.dataset.opacity);

                    if (currentOpacity >= 1) {
                        //do not increase anymore
                    } else {
                        currentOpacity = parseFloat((currentOpacity + 0.1).toFixed(1));
                    }
                    square.dataset.opacity = currentOpacity;
                    opacity = currentOpacity;

                } else {
                    opacity = 1;
                }

                event.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                console.log(opacity);
                console.log(`${r}, ${g}, ${b}`);
            }
        });

    });
}


//generate random colors
function ran(max) {
    return Math.floor(Math.random() * (max + 1));
}

//show gridlines
showGridLinesButton.addEventListener(`click`, () => {
    const squares = gridContainer.querySelectorAll('.squares');

    squares.forEach(square => {
        square.classList.toggle('no-grid-lines');
    });

    showGridLinesButton.textContent =
        showGridLinesButton.textContent === "show grid lines"
            ? "hide grid lines"
            : "show grid lines";
});


// Helper function to reset the dataset of squares
function resetDataset() {
    const squares = document.querySelectorAll('.squares');
    squares.forEach(square => {
        square.dataset.opacity = 0.0;
        square.dataset.r = ``;
        square.dataset.g = ``;
        square.dataset.b = ``;
    });
}

// Clear colors in grid resetting dataset color and opacity
clearGridColor.addEventListener('click', () => {
    const squares = gridContainer.querySelectorAll('.squares');
    squares.forEach(square => {
        square.style.backgroundColor = '';
        resetDataset(); 
    });
});

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

// Listen for changes in color options and reset dataset
colorRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        resetDataset(); // Reset dataset for all squares
    });
});

// Listen for changes on opacity radio buttons and reset dataset
opacityRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        resetDataset(); // Reset dataset for all squares
    });
});
