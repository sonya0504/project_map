import React from 'react';
import styles from './App.scss';
// import BasicLevel from './BasicLevel';
// import MediumLevel from './MediumLevel';
// import ExpertLevel from './ExpertLevel';

// const minesweeper = require('minesweeper');
//
// const BoardStateEnum = minesweeper.BoardStateEnum;
//
// // Określa czy komórka została odsłonięta czy nie
// const CellStateEnum = minesweeper.CellStateEnum;

import { CellStateEnum } from "minesweeper";

// const getCellString = function (content) {
//     return ' [ ' + content + ' ] ';
// };
//
// const cellToString = cell => {
//     if (cell.state === CellStateEnum.CLOSED) {
//         if (cell.flag === CellFlagEnum.NONE) {
//             return getCellString(' ');
//         } else if (cell.flag === CellFlagEnum.EXCLAMATION) {
//             return  getCellString('!');
//         } else if (cell.flag === CellFlagEnum.QUESTION) {
//             return  getCellString('?');
//         }
//     } else if (cell.state === CellStateEnum.OPEN) {
//         if (cell.isMine) {
//             return  getCellString('*');
//         } else {
//             return  getCellString(cell.numAdjacentMines);
//         }
//     }
// }

const colorMap = {
    0: 'lightgrey',
    1: 'blue',
    2: 'red',
    3: 'green',
    4: 'darkblue',
    5: 'darkred',
    6: 'darkgreen',
    7: 'brown',
    8: 'black'
};

class Cell extends React.Component {

    render () {
        let { cell, onOpen } = this.props;
        let fontColor = { color: colorMap[cell.numAdjacentMines]};

        return (
            <div className={ styles.cell } style={ fontColor } onClick={ () => this.props.onOpen(cell) }>
                { cell.state !== CellStateEnum.CLOSED && (cell.isMine ? "*" : cell.numAdjacentMines) }
            </div>
        )

    }
}

const Row = ({ cells, onCellOpened }) => (

    <div className={ styles.row } >
        { cells.map(cell =>
            <Cell key={ `cell_${cell.x}_${cell.y}`} cell={ cell } onOpen={ onCellOpened }/>)}
    </div>
);

class Board extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            grid: this.props.board.grid()
        }
    }

    onCellOpened({ x, y }) {
        this.props.board.openCell(x, y);

        console.log({ x, y });

        this.setState({
           grid: this.props.board.grid()
        });
    }

    render() {
        return <div className={ styles.board }>
            { this.state.grid.map((cells, idx) => <Row key={ `row_${idx}` } cells={ cells } onCellOpened={ cell => this.onCellOpened(cell) }/>) }
        </div>
    }
};

// window.openCell = (x, y) => {
//     Board.openCell(x, y);
//     window.printBoard();
// };

export default Board;