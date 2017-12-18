let tiles;
let table;
let done;

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
}

let reset = () => {
  table = [0, 0, 0,  0, 0, 0,  0, 0, 0];
  done = false;
  for(i in tiles){
    tiles[i].style.backgroundColor = "white";
  }
}

let checkFull = (t) => {
  for(let i = 0; i < 9; i++){
    if(!t[i])return false;
  }
  return true;
};

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

let set = (index, player) => {
  if(done)return false;
  if(!table[index]){
    table[index] = player;
    let color;
    color = (player===1?"blue":"red");
    tiles[index].style.backgroundColor = color;
    return true;
  }
  return false;
  };

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

let aiMakeMove = () => {
  set(aiBestMove(table, 0, -1, false), -1);
};

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
