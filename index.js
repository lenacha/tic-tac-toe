var prompt = require('prompt');

let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' ',
};

let markBoard = (position, mark) => {
    board[position] = mark.toUpperCase();
};

let printBoard = () => {
    console.log('\n',
        board[1], '|', board[2], '|', board[3], '\n',
        '---------\n',
        board[4], '|', board[5], '|', board[6], '\n',
        '---------\n',
        board[7], '|', board[8], '|', board[9], '\n')
}


let playTurn = (player) => {
    console.log('Now Your Turn: ', player);
    prompt.start();
    prompt.get(['position'], (err, result) => {
        let res = parseInt(result.position)
        if (checkValidMove(res)) {
            markBoard(res, player);
            printBoard();
            if (checkWin(player)) {
                console.log(`${player} YOU WIN! \n Winner Winner Chicken Dinner`);
            } else if (player === 'X') {
                playTurn('O');
            } else {
                playTurn('X');
            }
        } else {
            console.log('Invalid Input Try Again!');
            playTurn(player);
        }
    })
};



var winCombinations = [null, [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let checkWin = (player) => {
    for (let i = 1; i < winCombinations.length; i++) {
        let marks = ''
        for (let j = 0; j < 3; j++) {
            if (board[winCombinations[i][j]] === player) {
                marks += 'T'
            }
        }
        if (marks === 'TTT') {
            return true;
        }
    }
    return false;
}


let checkValidInput = (input) => {
    if (Number.isInteger(input) && input < 10 && input > 0) {
        return true;
    } else {
        return false;
    }
}

let checkValidMove = (position) => {
    if (checkValidInput(position) && board[position] === ' ') {
        return true;
    } else {
        return false;
    }
}


console.log('Game started: \n' +
' 1 | 2 | 3 \n' +
' --------- \n' +
' 4 | 5 | 6 \n' +
' --------- \n' +
' 7 | 8 | 9 \n');

playTurn('X');