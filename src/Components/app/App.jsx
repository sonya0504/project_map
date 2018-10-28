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

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            showingHelp: false,
            board: null
        }
    }

    componentDidMount() {
        this.newGame();
    }

    showHelp = () => {
        if (!this.state.showingHelp) {
            this.setState({ showingHelp: true }, () => {
                this.helpTimeout = setTimeout(() => this.setState({ showingHelp: false }), 3000)
            });
        }
    }

    newGame = (config = mineArray) => { //config - domyślnie przyjmij mineArry - można z tego wyjść do zmiany wielkości tablicy
        clearTimeout(this.helpTimeout);
        this.setState({
            board: new minesweeper.Board(config),
            showingHelp: false
        });
    }

    render () {
         return (
            <div className={ styles.appContainer } >
            <TopBar onShowHelp={ this.showHelp } onNewGame={ this.newGame }/>
            { this.state.board && <Board board={ this.state.board } showHelp={ this.state.showingHelp}/>}
        </div>
        )
        };
    }
   

export default App;