import React from 'react';
import styles from './App.scss';

import {CellStateEnum, BoardStateEnum} from "minesweeper";

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

const stateToClassName = {
    [BoardStateEnum.PRISTINE]: styles.interactive,
    [BoardStateEnum.IN_PROGRESS]: styles.interactive,
    [BoardStateEnum.WON]: styles.nonInteractive,
    [BoardStateEnum.LOST]: styles.nonInteractive
};

class Cell extends React.Component {

    render() {
        let {cell, onOpen} = this.props;
        let fontColor = {color: colorMap[cell.numAdjacentMines]};

        const className = [
            styles.cell,
            cell.state === CellStateEnum.OPEN ? styles.open : styles.closed
        ].join(" ");

            return (
                <div className={className} style={fontColor} onClick={() => this.props.onOpen(cell)}>
                    { cell.state === CellStateEnum.OPEN && (cell.isMine ? "*" : cell.numAdjacentMines)}
                    { cell.state === CellStateEnum.CLOSED && this.props.isLost && cell.isMine && "*"}
                </div>
            )
    }
}

const Row = ({cells, onCellOpened, isLost }) => (

    <div className={styles.row}>
        {cells.map(cell =>
            <Cell isLost={ isLost } key={`cell_${cell.x}_${cell.y}`} cell={cell} onOpen={onCellOpened}/>)}
    </div>
);

class Board extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            grid: this.props.board.grid(),
            boardState: this.props.board.state()
        }
    }

    onCellOpened({x, y}) {
        if (this.props.board.state() === BoardStateEnum.IN_PROGRESS || this.props.board.state() === BoardStateEnum.PRISTINE) {
            this.props.board.openCell(x, y);
        }

        this.setState({
            grid: this.props.board.grid(),
            boardState: this.props.board.state()
        });
    }

    render() {
        const className = [
            styles.board,
            stateToClassName[this.props.board.state()]
        ].join(" ");

            return <div className={ className }>
                {this.state.grid.map((cells, idx) => <Row isLost={ this.state.boardState === BoardStateEnum.LOST } key={`row_${idx}`} cells={cells}
                                                          onCellOpened={cell => this.onCellOpened(cell)} />)}
            </div>
    }
}

export default Board;