
const cells = document.querySelectorAll(".cell");
const currentTurn = document.querySelector("#currentTurn");
const restartBtn = document.querySelector(".restart-button");
const winConds = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let currentBoard = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""]
];
let winnerList = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let running = false;

initGame();
restartBtn.addEventListener("click", restartGame);

function initGame(){
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  currentTurn.textContent = `It is ${currentPlayer}\'s turn`;
  running = true;
}

function cellClicked(){
  const cellIndex = this.getAttribute("id");
  if(currentBoard[cellIndex[0]][cellIndex[1]] != ""){return;}
  updateCell(this, cellIndex);
  checkWinner(cellIndex[0], cellIndex[1]);
  if(running){decideNextBlock(cellIndex[1]);}
}

function updateCell(cell, index){
  currentBoard[index[0]][index[1]] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer(){
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  currentTurn.textContent = `It is ${currentPlayer}\'s turn`;
}

function checkWinner(bigCellIndex){
  let roundWon = false;
  
  for(let i=0; i<winConds.length; i++){
    const condition = winConds[i];
    const cellA = currentBoard[bigCellIndex][condition[0]];
    const cellB = currentBoard[bigCellIndex][condition[1]];
    const cellC = currentBoard[bigCellIndex][condition[2]];
    if(cellA == "" || cellB == "" || cellC == ""){
      continue;
    }
    if(cellA == cellB && cellB == cellC){
      roundWon = true;
      winnerList[bigCellIndex] = currentPlayer;
      break;
    }
  }
  if(roundWon){
    let roundWinner = document.querySelector(`#p${bigCellIndex}`);
    roundWinner.textContent = `${currentPlayer}`;
    let wonBlock = document.querySelector(`#c${bigCellIndex}`);
    wonBlock.style.display = 'block';
    
    for(let i=0; i<winConds.length; i++){
      const condition = winConds[i];
      const cellA = winnerList[condition[0]];
      const cellB = winnerList[condition[1]];
      const cellC = winnerList[condition[2]];
      if(cellA == "" || cellB == "" || cellC == ""){
        continue;
      }
      if(cellA == 'Draw' || cellB == 'Draw' || cellC == 'Draw'){
        continue;
      }
      if(cellA == cellB && cellB == cellC){
        currentTurn.textContent = `${currentPlayer} won`;
        running = false;
        return;
      }
    }
  }
  else if(!currentBoard[bigCellIndex].includes("")){
    let roundWinner = document.querySelector(`#p${bigCellIndex}`);
    roundWinner.textContent = 'Draw';
    roundWinner.style.fontSize  = '2em';
    let wonBlock = document.querySelector(`#c${bigCellIndex}`);
    wonBlock.style.display = 'block';
    winnerList[bigCellIndex] = 'Draw';
  }
  if(!winnerList.includes("")){
    currentTurn.textContent = 'Draw';
    running = false;
    return;
  }
}

function decideNextBlock(index){
  changePlayer();
  const blockWinner = winnerList[index];
  if(blockWinner == ""){
    let nextBlock = document.querySelector(`#c${index}`);
    nextBlock.style.display = 'none';
    for(let i=0; i<winnerList.length; i++){
      if(winnerList[i] == "" && i != index){
        const block = document.querySelector(`#c${i}`);
        block.style.display = 'block';
      }
    }
  }
  else{
    for(let i=0; i<winnerList.length; i++){
      if(winnerList[i] == ""){
        const block = document.querySelector(`#c${i}`);
        block.style.display = 'none';
      }
    }
  }
}

function restartGame(){
  if (confirm("Are you sure you want to start a new game? All progress will be lost.")) {
    currentPlayer = "X";
    currentBoard = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""]
    ];
    winnerList = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => cell.textContent = "");
    for(let i=0; i<winnerList.length; i++){
      const block = document.querySelector(`#c${i}`);
      block.style.display = 'none';
      const roundWinner = document.querySelector(`#p${i}`);
      roundWinner.textContent = "";
    }
    initGame();
  }
}

