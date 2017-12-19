let tiles;
let table;
let done;
let started;

//intializing values
window.onload = () => {
  tiles = [
    document.getElementById('0'),
    document.getElementById('1'),
    document.getElementById('2'),
    document.getElementById('3'),
    document.getElementById('4'),
    document.getElementById('5'),
    document.getElementById('6'),
    document.getElementById('7'),
    document.getElementById('8')
  ];
  table = [0, 0, 0,  0, 0, 0,  0, 0, 0];
  done = false;
  started = false;
}

//resets table, tiles and false state
let reset = () => {
  table = [0, 0, 0,  0, 0, 0,  0, 0, 0];
  done = false;
  for(i in tiles){
    tiles[i].style.backgroundColor = "white";
  }
  document.getElementById('aiFirstButton').style.display = 'inline';
  started = false;
};

//returns true only if a given table is full
let checkFull = (t) => {
  for(let i = 0; i < 9; i++){
    if(!t[i])return false;
  }
  return true;
};

//if noone won this function returns "false"
//if someone won function returns that player (1 / -1)
let checkWin = (table) => {
  let sumPos = (a, b, c) => {
    let tmp = table[a] + table[b] + table[c];
    return (Math.abs(tmp) === 3)*table[a];
  };
  let tmp = 0;
  for(i = 0; i<3; i++){
    tmp = sumPos(i, i+3, i+6);
    if(tmp)return tmp;
  }
  for(i = 0; i<3; i++){
    tmp = sumPos(i*3, i*3+1, i*3+2);
    if(tmp) return tmp;
  }
  tmp = sumPos(0,4,8);
  if(tmp) return tmp;
  tmp = sumPos(2,4,6);
  if(tmp) return tmp;

  return false;
};

//this function sets value of a given index
let set = (index, player) => {
  if(done)return false;
  if(!started){
    started = true;
    document.getElementById('aiFirstButton').style.display = 'none';
  }
  if(!table[index]){
    table[index] = player;
    let color;
    color = (player===1?"blue":"red");
    tiles[index].style.backgroundColor = color;
    return true;
  }
  return false;
  };

//this function returns index of best move for a given board and player
let aiBestMove = (board, depth,  player, turn) => {
  if(checkWin(board)) return -10 + depth;
  if(checkFull(board)) return 0;

  let max = -Infinity;
  let index = 0;

  for(let i=0; i<9; i++){
    if(board[i] === 0){
      let newBoard = board.slice();
      newBoard[i] = player;
      let moveVal = -aiBestMove(newBoard, depth+1, -player, false);
      if(moveVal>max){
        max = moveVal;
        index = i;
      }
    }
  }
  if(depth === 0) return index;

  return max;
}

//this function makes ai make the best possible move
let aiMakeMove = () => {
  set(aiBestMove(table, 0, -1, false), -1);
};

//this function is called when player clicks on a cell
function clicked(index){
  if(done)return false;
  if(!set(index, 1))return false;
  if(checkFull(table)) {
    done = true;
    return console.log('DRAW');
  }
  if(checkWin(table)){
    done = true;
    return console.log('HUMAN WINS');
  }
  aiMakeMove();
  if(checkFull(table)){
    done = true;
    return console.log('DRAW');
  }
  if(checkWin(table)) {
    done = true;
    return console.log('COMPUTER WINS', table);
  }
}

//this function is called when player wants ai to go first
let aiGoesFirst = () => {
  for(i in table) if(table[i]) return false;
  aiMakeMove();
  document.getElementById('aiFirstButton').style.display = 'none';
}
