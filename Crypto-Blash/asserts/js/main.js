// when css and html are loaded then it will listen to this event and all the content inside this function is exicuted
// addEventListener() method attaches an event handler to the specific element
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid"); // Finding HTML elements by css selector, now it returns list of all elements with class ="grid"
    const width = 8;
    let score = 0;
    let candies = [];
    const candyImages = [
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
            grid.appendChild(candy); // Add an HTML element candy to grie

            candy.setAttribute("draggable", true); // Change the attribute value of an HTML element
            candy.setAttribute("id", i); // Change the attribute value of an HTML element

            let randomImageIndex = Math.floor(Math.random() * candyImages.length)
            candy.style.backgroundImage = candyImages[randomImageIndex];
            candies.push(candy)
        }
    }

    createBoard();
    let ImageBeingDragged;
    let candyBeingDragged;
    let candyBeingReplaced;
    let ImageBeingReplaced;

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
        ImageBeingDragged = this.style.backgroundImage;
        candyBeingDragged = parseInt(this.id);
    }

    function dragLeave() {
        console.log(this.id, "DragLeave")
    }

    function dragDrop() {
        ImageBeingReplaced = this.style.backgroundImage;
        candyBeingReplaced = parseInt(this.id);

        this.style.backgroundImage = ImageBeingDragged;
        candies[candyBeingDragged].style.backgroundImage = ImageBeingReplaced;
    }

    function dragEnd() {

        let validMoves = [
            candyBeingDragged + 1,
            candyBeingDragged - 1,
            candyBeingDragged + width,
            candyBeingDragged - width
        ]

        const inValidMove = (candyBeingDragged + candyBeingReplaced) % width == width - 1 &&
            (candyBeingDragged % width == 0 || candyBeingReplaced % width == 0);
        const isValidMove = validMoves.includes(candyBeingReplaced) && !inValidMove;

        if (candyBeingReplaced && isValidMove) {
            candyBeingReplaced = null;
            candyBeingDragged = null;
            ImageBeingDragged = null;
            ImageBeingReplaced = null;
        } else if (candyBeingReplaced && !isValidMove) {
            candies[candyBeingDragged].style.backgroundImage = ImageBeingDragged;
            candies[candyBeingReplaced].style.backgroundImage = ImageBeingReplaced;
        }
    }

    function generateRandomCandies() {
        let len = width * (width - 1) - 1;
        for (let i = 0; i <= len; i++) {
            if (candies[i + width].style.backgroundImage === '') {
                candies[i + width].style.backgroundImage = candies[i].style.backgroundImage
                candies[i].style.backgroundImage = ''
            }
            // Generate candy image in 1st row which has no backgroung
            if (i < width && candies[i].style.backgroundImage == '') {
                candies[i].style.backgroundImage = candyImages[
                    Math.floor(Math.random() * candyImages.length)
                ];
            }
        }
    }

    function checkRow(no_of_candies) {
        let invalidIndex = [];
        const len = width * width - no_of_candies;
        for (let i = width - (no_of_candies - 1); i <= len; i += width) {
            invalidIndex.push(i, i + 1);
            if (no_of_candies == 4) invalidIndex.push(i + 2)
            if (no_of_candies == 5) invalidIndex.push(i + 3)
        }

        for (let i = 0; i <= len; i++) {
            candiesList = [];
            candiesList.push(i, i + 1, i + 2)
            if (no_of_candies == 4) candiesList.push(i + 3)
            if (no_of_candies == 5) candiesList.push(i + 4)
        
            let desiredImage = candies[i].style.backgroundImage;

            if (invalidIndex.includes(i)) continue;

            let match = candiesList.every(index => desiredImage != "" && candies[index].style.
                backgroundImage == desiredImage);
            if (match) {
                score += no_of_candies;
                console.log(score);
                candiesList.forEach(index => candies[index].style.backgroundImage = "")
            }
        }
    }

    // function checkRowForFive() {
    //     let invalidIndex = [];
    //     const len = width * width - 5;

    //     // Get all Inavlid corner indices
    //     for (let i = width - 4; i <= len; i += width)
    //         invalidIndex.push(i, i + 1, i + 2, i + 3);

    //     for (let i = 0; i <= len; i++) {
    //         let fiveCandies = [i, i + 1, i + 2, i + 3, i + 4];
    //         let desiredImage = candies[i].style.backgroundImage;

    //         if (invalidIndex.includes(i)) continue;

    //         let match = fiveCandies.every(index => desiredImage != "" && candies[index].style.
    //             backgroundImage == desiredImage);
    //         if (match) {
    //             score += 5;
    //             console.log(score);
    //             fiveCandies.forEach(index => candies[index].style.backgroundImage = "")
    //         }
    //     }
    // }

    // function checkRowForFour() {
    //     let invalidIndex = [];
    //     const len = width * width - 4;

    //     // Get all Inavlid corner indices
    //     for (let i = width - 3; i <= len; i += width)
    //         invalidIndex.push(i, i + 1, i + 2);

    //     for (let i = 0; i <= len; i++) {
    //         let fourCandies = [i, i + 1, i + 2, i + 3];
    //         let desiredImage = candies[i].style.backgroundImage;

    //         if (invalidIndex.includes(i)) continue;

    //         let match = fourCandies.every(index => desiredImage != "" && candies[index].style.
    //             backgroundImage == desiredImage);
    //         if (match) {
    //             score += 4;
    //             console.log(score);
    //             fourCandies.forEach(index => candies[index].style.backgroundImage = "")
    //         }
    //     }
    // }

    // function checkRowForThree() {
    //     let invalidIndex = [];
    //     const len = width * width - 3

    //     for (let i = width - 2; i <= len; i += width)
    //         invalidIndex.push(i, i + 1);

    //     for (let i = 0; i <= len; i++) {
    //         let threeCandies = [i, i + 1, i + 2];
    //         let desiredImage = candies[i].style.backgroundImage;

    //         if (invalidIndex.includes(i)) continue;

    //         let match = threeCandies.every(index => desiredImage != "" && candies[index].style.
    //             backgroundImage == desiredImage);
    //         if (match) {
    //             score += 3;
    //             console.log(score);
    //             threeCandies.forEach(index => candies[index].style.backgroundImage = "")
    //         }
    //     }
    // }

    function checkColumnForFive() {

        let len = width * (width - 4) - 1

        for (let i = 0; i <= len; i++) {
            let fiveCandies = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
            let desiredImage = candies[i].style.backgroundImage;

            let match = fiveCandies.every(index => desiredImage != "" && candies[index].style.
                backgroundImage == desiredImage);
            if (match) {
                score += 5;
                console.log(score);
                fiveCandies.forEach(index => candies[index].style.backgroundImage = "")
            }
        }
    }

    function checkColumnForFour() {

        let len = width * (width - 3) - 1

        for (let i = 0; i <= len; i++) {
            let fourCandies = [i, i + width, i + width * 2, i + width * 3];
            let desiredImage = candies[i].style.backgroundImage;

            let match = fourCandies.every(index => desiredImage != "" && candies[index].style.
                backgroundImage == desiredImage);
            if (match) {
                score += 4;
                console.log(score);
                fourCandies.forEach(index => candies[index].style.backgroundImage = "")
            }
        }
    }

    function checkColumnForThree() {

        let len = width * (width - 2) - 1

        for (let i = 0; i <= len; i++) {
            let threeCandies = [i, i + width, i + width * 2];
            let desiredImage = candies[i].style.backgroundImage;

            let match = threeCandies.every(index => desiredImage != "" && candies[index].style.
                backgroundImage == desiredImage);
            if (match) {
                score += 3;
                console.log(score);
                threeCandies.forEach(index => candies[index].style.backgroundImage = "")
            }

        }

    }

    function init() {
        checkRow(5);
        checkColumnForFive();
        checkRow(4);
        checkColumnForFour();
        checkRow(3);
        checkColumnForThree()
        generateRandomCandies();
    }
    init();

    window.setInterval(function () {
        init();
    }, 300)
});
