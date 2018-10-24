import React from 'react';
import './Minesweeper-all';
import {BoardStateEnum, CellStateEnum} from "minesweeper";
import styles from "./App.scss";

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

export default Cell;