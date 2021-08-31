// when css and html are loaded then it will listen to this event and all the content inside this function is exicuted
// addEventListener() method attaches an event handler to the specific element
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid"); // Finding HTML elements by css selector, now it returns list of all elements with class ="grid"
    const width = 8;
    let candies = [];
    const candyColors = [
        'url(asserts/images/bitcoin_crypto.png)',
        'url(asserts/images/ethereum_crypto.png)',
        'url(asserts/images/litcoin_crypto.png)',
        'url(asserts/images/dogecoin_crypto.png)',
        'url(asserts/images/tether_crypto.png)',
        'url(asserts/images/bnbcoin_crypto.png)'
    ]

    function createBoard() {
        for (let i = 0; i < width * width; i++) {

            let candy = document.createElement('div'); // Creates an HTML element
            // console.log(candy);
            grid.appendChild(candy); // Add an HTML element candy to grie

            candy.setAttribute("draggable", true); // Change the attribute value of an HTML element
            candy.setAttribute("id", i); // Change the attribute value of an HTML element

            let randomColorIndex = Math.floor(Math.random() * candyColors.length)
            candy.style.backgroundImage = candyColors[randomColorIndex];
            candies.push(candy)
        }
    }

    // console.log(createBoard());
    createBoard();
    let colorBeingDragged;
    let candyBeingDragged;
    let candyBeingReplaced;
    let colorBeingReplaced;

    // addEventListener() method attaches an event handler to the specific element

    candies.forEach(candy => candy.addEventListener("dragstart", dragStart));
    candies.forEach(candy => candy.addEventListener("dragend", dragEnd));
    candies.forEach(candy => candy.addEventListener("dragleave", dragLeave));
    candies.forEach(candy => candy.addEventListener("drop", dragDrop));
    candies.forEach(candy => candy.addEventListener("dragover", function (e) {
        e.preventDefault();
    }));
    candies.forEach(candy => candy.addEventListener("dragenter", function (e) {
        e.preventDefault();
    }));

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        candyBeingDragged = parseInt(this.id);
    }

    function dragLeave() {
        console.log(this.id, "DragLeave")
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage;
        candyBeingReplaced = parseInt(this.id);
        console.log(this.id, "DragDrop");

        this.style.backgroundImage = colorBeingDragged;
        candies[candyBeingDragged].style.backgroundImage = colorBeingReplaced;
    }

    function dragEnd() {

        let validMoves = [
            candyBeingDragged + 1,
            candyBeingDragged - 1,
            candyBeingDragged + width,
            candyBeingDragged - width
        ]
        console.log(candyBeingReplaced, "In drag End")

        const isValidMove = validMoves.includes(candyBeingReplaced)

        if (candyBeingReplaced && isValidMove) {
            candyBeingReplaced = null;
            candyBeingDragged = null;
            colorBeingDragged = null;
            colorBeingReplaced = null;
        }
        else if (candyBeingReplaced && !isValidMove) {
            candies[candyBeingDragged].style.backgroundImage = colorBeingDragged;
            candies[candyBeingReplaced].style.backgroundImage = colorBeingReplaced;
        }
    }
});

// document.getElementById("main-container").addEventListener('click', function() {
//     console.log(this.style.backgroundColor);
//     console.log(this)
// })