import React from 'react';
const minesweeper = require('minesweeper');

const BoardStateEnum = minesweeper.BoardStateEnum;

// Określa czy komórka została odsłonięta czy nie
const CellStateEnum = minesweeper.CellStateEnum;

// Określa czy komórka została oznaczona flagą czy znakiem zapytania
// może być:

const CellFlagEnum = minesweeper.CellFlagEnum;
// minesweeper.CellFlagEnum.NONE;
// minesweeper.CellFlagEnum.EXCLAMATION;
// minesweeper.CellFlagEnum.QUESTION;


const Board = minesweeper.Board;
const Cell = minesweeper.Cell;
const generateMineArray = minesweeper.generateMineArray;

const printBoard = function (board) {
    let i,
        strColHead = '   ',
        grid = board.grid();

    // print a header that shows the column numbers
    for (i = 0; i < board.numCols(); i++) {
        strColHead += '   ' + i + '   ';
    }

    const head = strColHead;
    const rows = [];

    // print all the rows on the board
    for (i = 0; i < board.numRows(); i++) {
        rows.push(printRow(grid[i], i));
    }

    return `${head}\n${rows.join("\n")}`;

    // return { head, rows };
};

const printRow = function (rowArray, rowNum) {
    let i,
        cell,
        strRow = '';

    // Start the row with the row number
    strRow += rowNum !== undefined ? ' ' + rowNum + ' ' : '';

    // Add each cell in the row to the string we will print
    for (i=0; i<rowArray.length; i++) {
        cell = rowArray[i];
        if (cell.state === CellStateEnum.CLOSED) {
            if (cell.flag === CellFlagEnum.NONE) {
                strRow += getCellString(' ');
            } else if (cell.flag === CellFlagEnum.EXCLAMATION) {
                strRow += getCellString('!');
            } else if (cell.flag === CellFlagEnum.QUESTION) {
                strRow += getCellString('?');
            }
        } else if (cell.state === CellStateEnum.OPEN) {
            if (cell.isMine) {
                strRow += getCellString('*');
            } else {
                strRow += getCellString(cell.numAdjacentMines);
            }
        }
    }

    // Print this row to the console
    // console.log(strRow);
    return strRow;
};

const getCellString = function (content) {
    return ' [ ' + content + ' ] ';
};


const basic = minesweeper.generateMineArray({
    rows: 8,
    cols: 8,
    mines: 10
});

const basicBoard = new Board(basic);
const basicLevel = printBoard(basicBoard);

const medium = minesweeper.generateMineArray({
    rows: 16,
    cols: 16,
    mines: 40
});

const mediumBoard = new Board(medium);
const mediumLevel = printBoard(mediumBoard);

const expert = minesweeper.generateMineArray({
    rows: 30,
    cols: 16,
    mines: 99
});

const expertBoard = new Board(expert);
const expertLevel = printBoard(expertBoard);

export default basicLevel; mediumLevel; expertLevel;

window.printBoard = () => {
    const mainBoard = document.getElementById('game');
    mainBoard.innerHTML = `<pre> ${printBoard(basicBoard)} </pre>`;
};

window.openCell = (x, y) => {
    basicBoard.openCell(x, y);
    window.printBoard();
};

window.printBoard();
/*
basicBoard.cycleCellFlag(x,y);
basicBoard.state();

mediumBoard.openCell(x,y);
mediumBoard.cycleCellFlag(x,y);
mediumBoard.state();

expertBoard.openCell(x,y);
expertBoard.cycleCellFlag(x,y);
expertBoard.state();
*/


// rodzaje BoardStateEnum:
// BoardStateEnum.PRISTINE // wszystkie komówrki przed kliknięciem
// BoardStateEnum.IN_PROGRESS //komórki, które zostały kliknięte ale nie są w stanie wygranej i przegranej
// BoardStateEnum.LOST // mina
// BoardStateEnum.WON // wygrana
