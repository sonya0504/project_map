import React from 'react';
import styles from "./App.scss";
import TopBar from './TopBar';
import Board from './Board';

const minesweeper = require('minesweeper');

const mineArray = minesweeper.generateMineArray({
    rows: 8,
    cols: 8,
    mines: 10
});

const App = () => {
    return (
        <div className={ styles.appContainer }>
            <TopBar/>
            <Board board={ new minesweeper.Board(mineArray) }/>
        </div>
        )
};

export default App;