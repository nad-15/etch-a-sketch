const about = document.querySelector(`.about`);
const clearGridColor = document.querySelector(`.clear-colors-button`);
const numOfSquareInput = document.getElementById(`num-squares-input`);
const createGridButton = document.getElementById(`create-grid-button`);
const gridContainer = document.getElementById(`grid-container`);
const toggleGridButton = document.querySelector(`.toggle-grid-button`);
const colorPicker = document.getElementById(`colorPicker`);
const opacityRadios = document.querySelectorAll('input[name="opacity"]');
const radioButtonsContainer = document.querySelector(`.user-choices`);
const colorRadios = document.querySelectorAll('input[name="color-type"]');
const eraserButton = document.querySelector(`.eraser-button`);
const penButton = document.querySelector(`.pen-button`);
const downloadButton = document.querySelector(`.download-button`);
const toolStatus = document.querySelector(`.tool-status`);
const colorPickerAlt = document.querySelector(`.colorPicker-palette`);
const customColorRadioButton = document.querySelector(`.custom-color-radio`);
const colorTypeRadios = document.querySelectorAll('input[name="color-type"]');
const opacityChangeRadios = document.querySelectorAll('input[name="opacity"]');

let isPenOn = true;
let isEraserOn = false;


//Initialize grid and square listeners
createGrid(16);
attachSquareEvents();


//Initiate creation of grid as per users chosen size
createGridButton.addEventListener('click', function () {

    const squareNum = parseInt(numOfSquareInput.value);
    if (squareNum >= 1 && squareNum <= 200) {
        createGrid(squareNum);
        attachSquareEvents();
    } else {
        alert('Enter valid number: Min: 1, Max: 200');
    }
});

//Grid Maker Funciton
function createGrid(squareNum) {
    toggleGridButton.classList.remove('is-on');
    penButton.click();
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

//Attach event listeners to all squares 
function attachSquareEvents() {

    const squares = document.querySelectorAll(`.squares`);
    squares.forEach(square => {
        let opacity;
        square.dataset.opacity = 0.0;

        square.addEventListener(`mouseenter`, (event) => {

            //drawing
            if (isPenOn) {
                //start drawing by holding shift key
                if (event.shiftKey) {
                    let r, g, b;

                    //Get chosen color and opacity 
                    const colorType = getCheckedValue(colorTypeRadios);
                    const opacityChange = getCheckedValue(opacityChangeRadios);

                    if (colorType === 'black') {
                        // Black color option
                        r = 0;
                        g = 0;
                        b = 0;
                        // color = 'rgb(0, 0, 0,)';
                    } else if (colorType === 'random-colors') {
                        if (opacityChange === 'increase-opaq') {
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


                    if (opacityChange === 'increase-opaq') {
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

            //erasing
            } else if(isEraserOn) {

                if (event.shiftKey) {
                    //clear color
                    square.style.backgroundColor = '';
                    //celar dataset
                    square.dataset.opacity = 0.0;
                    square.dataset.r = ``;
                    square.dataset.g = ``;
                    square.dataset.b = ``;

                }
            }

        });

    });
}
//Funciton to get checked option in the radiobuttons: color and opacity update
function getCheckedValue(buttons) {
    for (let button of buttons) {
        if (button.checked) {
            return button.value;
        }
    }
    return null;
}


//Generate random colors
function ran(max) {
    return Math.floor(Math.random() * (max + 1));
}

//Toggle grid "lines"
toggleGridButton.addEventListener(`click`, () => {
    const squares = gridContainer.querySelectorAll('.squares');

    squares.forEach(square => {
        square.classList.toggle('no-grid-lines');
    });
    toggleGridButton.classList.toggle(`is-on`);
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

// Clear colors in grid resetting dataset color and opacity and auto choose pen
clearGridColor.addEventListener('click', () => {
    const squares = gridContainer.querySelectorAll('.squares');
    squares.forEach(square => square.style.removeProperty('background-color'));
    resetDataset();
    penButton.click();

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


about.addEventListener(`click`, () => {
    alert(`About? Just hold your mouse, shake it like you're possessed, and hope for the best!`);

});


//Pen is chosen
penButton.addEventListener(`click`, () => {
    isPenOn = true;
    isEraserOn = false;
    penButton.classList.add(`is-on`);
    eraserButton.classList.remove(`is-on`);
    toolStatus.textContent = `pen is on, hold shift-key to start drawing`;


});

//Eraser is chosen
eraserButton.addEventListener(`click`, () => {
    isPenOn = false;
    isEraserOn = true;
    penButton.classList.remove(`is-on`);
    eraserButton.classList.add(`is-on`);
    toolStatus.textContent = `eraser is on, hold shift-key to start erasing`;

});



downloadButton.addEventListener('click', () => {

    domtoimage.toPng(gridContainer)
        .then(function (dataUrl) {
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'grid.png';
            a.click();

            alert('The result of your possessed hands is downloaded successfully!');


        })
        .catch(function (error) {
            console.error('Error:', error);
            alert("Oops, it seems your art skills need a little fine-tuning. Give it another shot!");
        });
});

//Redirecting the true colorPicker to its alternate element
colorPickerAlt.addEventListener(`click`, () => {
    colorPicker.click();
});


colorPicker.addEventListener('input', function () {
    colorPickerAlt.style.color = colorPicker.value;
    customColorRadioButton.checked = true;
    resetDataset();
});