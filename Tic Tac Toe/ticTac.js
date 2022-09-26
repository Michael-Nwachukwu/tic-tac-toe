// selecting the cells
const cellElements = document.querySelectorAll('[data-cell]');

// get the board
const board = document.getElementById('board')

// variable for class application
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

const winningMessageElement = document.getElementById('winningMessage');

const restartButton = document.getElementById('restartButton');

const winCombos = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
    
 ];


// if its true its circles turn if false then its Xs turn
let circleTurn;

// call the function start game at the begining
startGame();

restartButton.addEventListener('click', startGame)

function startGame () {
    // set circleturn to false so it'll retun Xs turn
    circleTurn = false;

    // add an eventlistener to every cell on the borad and assign function handleClick to it- it will be defined below. handleClick if a function that runs each time a cell is clicked. it holds the vital components of the game like add marks, check for win/draw, switch turns btw x n o....  once:true means fire this event once so once we click on a cell its not going to fire again.
    cellElements.forEach(cell => {
        // removing all elements in cells on restart button click
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);

        cell.addEventListener('click', handleClick, { once: true } )
    });

    //  call the function for hover effect at the begining of the game
     setBoardHoverClass();

    //  removing the winning message modal on click of restart btn
    winningMessageElement.classList.remove('show');

}


 function handleClick (e) {
    //Things to do = 1. place x/o mark. 2. check for win. 3. check for draw. 4. switch turns
     
    // placing mark - get the target cell and current class
    const cell = e.target;
    
    //creating the current class / players turn. if its circles turn then we're gonna return the circle class otherwise we return the x class
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    // after getting the current class / players turn then we place the mark(x/o). we'll be doing this in a function
    placeMark(cell, currentClass);

    // check for win after a mark a placed if no win/draw then swapTurn. so we use if statement to check if the currentClass/Player has won
    if( checkWin( currentClass ) ) {
        // pass in a function endgame that'll run at the end of the game and pass in false - this ssays its not a draw since the actual function is set to draw
        endGame(false);

    }else if(isDraw()){
        
        // then if isdraw is true ie if it is indeed a draw then set the endgame function to true = draw
        endGame(true);

    }else{ //else continue game by switching turns and setting hover

        // switching turns
        swapTurns();

        // call function for board hover. and we want to do that after we swap turns so we'll know whose turn it currently is
        setBoardHoverClass();
    }
 }

 function endGame( draw ){
    if( draw ){
        winningMessageTextElement.textContent = 'Draw!'
    }else{
        // thiss will check if its circles turn and return o wins else if its x turns return x wins
        winningMessageTextElement.textContent = `${circleTurn ? "O" : "X" } wins!`
    }
    // add the show class to display the winning message at the end of game
    winningMessageElement.classList.add('show');
 }

//  create the isdraw function similar to what we did with the checkwin. check if if every cell in the cellelements contains a class. cellelements do not have an every method so we destructure it into an array to use the method
 function isDraw () {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS);
    })
 }

 function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
 }

 function swapTurns() {
    // take circle turn and set it it to the opposite of circle turn
    circleTurn = !circleTurn;
 }

 function setBoardHoverClass() {
    // remove all existing classes
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    
    // then if its circles turn then we add in the circle class
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
       board.classList.add(X_CLASS);
    }
 }

//  function that checks if a player/currentclass has won the game by checkingh the wincombos to see if any of the wincombos tallies with the currentcombinations
//   wincombos.some = returns true if any of the values inside it are true, and thsi is going to loop over all of the different combos 
//combo.every =  for each one of the combinations we want to check if all the indexes of any one combination has the same class. 
// cellElement[index] = checking if every index of the cellElements contain the class of currenClass ie if the current class is in all three of the combination then there is a winner
// combo = each child array inside wincombo ie if each array inside wincombo has the same class


  function checkWin ( currentClass ) {
    return winCombos.some( combo => {
        // checking if every index of the combo contains the same class
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
  }












































// const X_CLASS = 'x'
// const CIRCLE_CLASS = 'circle'
// const WINNING_COMBINATIONS = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6]
// ]
// const cellElements = document.querySelectorAll('[data-cell]')
// const board = document.getElementById('board')
// const winningMessageElement = document.getElementById('winningMessage')
// const restartButton = document.getElementById('restartButton')
// const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
// let circleTurn

// startGame()

// restartButton.addEventListener('click', startGame)

// function startGame() {
//   circleTurn = false
//   cellElements.forEach(cell => {
//     cell.classList.remove(X_CLASS)
//     cell.classList.remove(CIRCLE_CLASS)
//     cell.removeEventListener('click', handleClick)
//     cell.addEventListener('click', handleClick, { once: true })
//   })
//   setBoardHoverClass()
//   winningMessageElement.classList.remove('show')
// }

// function handleClick(e) {
//   const cell = e.target
//   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
//   placeMark(cell, currentClass)
//   if (checkWin(currentClass)) {
//     endGame(false)
//   } else if (isDraw()) {
//     endGame(true)
//   } else {
//     swapTurns()
//     setBoardHoverClass()
//   }
// }

// function endGame(draw) {
//   if (draw) {
//     winningMessageTextElement.innerText = 'Draw!'
//   } else {
//     winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
//   }
//   winningMessageElement.classList.add('show')
// }

// function isDraw() {
//   return [...cellElements].every(cell => {
//     return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
//   })
// } 

// function placeMark(cell, currentClass) {
//   cell.classList.add(currentClass)
// }

// function swapTurns() {
//   circleTurn = !circleTurn
// }

// function setBoardHoverClass() {
//   board.classList.remove(X_CLASS)
//   board.classList.remove(CIRCLE_CLASS)
//   if (circleTurn) {
//     board.classList.add(CIRCLE_CLASS)
//   } else {
//     board.classList.add(X_CLASS)
//   }
// }

// function checkWin(currentClass) {
//   return WINNING_COMBINATIONS.some(combination => {
//     return combination.every(index => {
//       return cellElements[index].classList.contains(currentClass)
//     })
//   })
// }