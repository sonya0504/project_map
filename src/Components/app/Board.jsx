import React from 'react';
import styles from './App.scss';
import {CellStateEnum, BoardStateEnum, CellFlagEnum} from "minesweeper";
import { EWOULDBLOCK } from 'constants';
import flagSrc from "./img/flag.png";
import mineExplodeSrc from "./img/mineExplode.png";
import mineSrc from "./img/mine.jpeg";

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

const CELLFLAG_TO_STRING = {
    [CellFlagEnum.NONE]: " ",
    [CellFlagEnum.EXCLAMATION]: <img src={ flagSrc } style={ styles.nonInteractive }/>,
    [CellFlagEnum.QUESTION]: "?"
};

class Cell extends React.Component {

    render() {
        let { cell, onOpen, onFlag, isLost, showHelp } = this.props;
        let fontColor = {color: colorMap[cell.numAdjacentMines]};

        const className = [
            styles.cell,
            cell.state === CellStateEnum.OPEN ? styles.open : styles.closed
        ].join(" ");

        const isOpen = cell.state === CellStateEnum.OPEN;

        const callbacks = { 
            onClick: () => !showHelp && onOpen(cell), 
            onContextMenu: (e) => {
                if (showHelp) {
                    return;
                }
                e.preventDefault(); 
                onFlag(cell); 
            }
        }

//console.log({ x: cell.x, y: cell.y, showHelp, isOpen, isLost});

        if (showHelp) {
            if (cell.isMine) {
               return <div className={ className }><img src={ mineSrc } /></div>
            }
        }

        if (isOpen) {
            if (cell.isMine) {
               return <div className={ className }><img src={ mineExplodeSrc} style= {{ backgroundColor: 'red' }}/></div>
            } else {
                return <div className={ className } style={ fontColor } { ...callbacks }>
                    { cell.numAdjacentMines }
                </div>
            }
        } else {
            if (isLost && cell.isMine) {
                return <div className={ className }><img src={ mineSrc }/></div>;
            } else {
                return <div className={ className } { ...callbacks }>
                        { CELLFLAG_TO_STRING[cell.flag] }
                    </div>
            }
        }        
    }
}

const Row = ({ cells, onCellOpened, isLost, onCellFlagged, showHelp }) => (

    <div className={ styles.row }>
        { cells.map(cell =>
            <Cell isLost={ isLost } key={`cell_${cell.x}_${cell.y}`} cell={ cell } onOpen={ onCellOpened } onFlag={ onCellFlagged }
            showHelp={showHelp}/>) }
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

    componentWillReceiveProps(newProps) {
        this.setState({
            grid: newProps.board.grid(),
            boardState: newProps.board.state()
        });
    }

    onCellOpened( {x, y} ) {
        if (this.props.board.state() === BoardStateEnum.IN_PROGRESS || this.props.board.state() === BoardStateEnum.PRISTINE) {
            this.props.board.openCell(x, y);
        }

        this.setState({
            grid: this.props.board.grid(),
            boardState: this.props.board.state()
        });
    }

    onCellFlagged( {x, y} ) {
        // console.log("Flage", {x, y});
        if (this.props.board.state() === BoardStateEnum.IN_PROGRESS || this.props.board.state() === BoardStateEnum.PRISTINE) {
            this.props.board.cycleCellFlag(x, y);
        }

        this.setState({
            grid: this.props.board.grid(),
            boardState: this.props.board.state()
        })
    }

    render() {
        const className = [
            styles.board,
            // stateToClassName[this.props.board.state()]
        ].join(" ");

        return <div  className={ styles.back }>
            <div className={ className }>
                {this.state.grid.map((cells, idx) => <Row isLost={ this.state.boardState === BoardStateEnum.LOST } key={`row_${idx}`} cells={cells}
                                                          onCellOpened={cell => this.onCellOpened(cell)}
                                                          onCellFlagged={cell => this.onCellFlagged(cell)}
                                                          showHelp={this.props.showHelp}
                                                          newGame={this.props.newGame}
                />)}
            </div>
        </div>
    }
}

export default Board;