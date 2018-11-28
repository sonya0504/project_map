import React from 'react';
import styles from './App.scss';
import mineSrc from "./img/mine.jpeg";
import flagSrc from "./img/flag.png";
import mineExplodeSrc from "./img/mineExplode.png";
import App from "./App";
import { CellStateEnum, BoardStateEnum, CellFlagEnum }  from "minesweeper";

// niebieski pasek
class Logo extends React.Component {
    render () {
        return <img src={ mineSrc }/>
    }
}

// główne menu
class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          clicked: false
        };
    }

    menuClick = () => {
        this.setState({
            clicked: !this.state.clicked
        });
    };

    render () {

        return <div className={ styles.menu }>
                    { this.state.clicked && <ul className={styles.menuItem} >
                        <li onClick={ () => this.props.onNewGame() }>New</li>
                        <li onClick={ () => this.props.onNewGame() }>Beginner</li>
                        <li onClick={ () => this.props.onNewGameMedium() }>Intermediate</li>
                        <li onClick={ () => this.props.onNewGameExpert() }>Expert</li>
                        <li>Custom...</li>
                    </ul> }
                    <div className={ styles.gameBtn } onClick={ this.menuClick } >Game</div>
                    <div onClick={ () => this.props.onShowHelp() } className={ styles.help }>Help</div>
                </div>;
}        
}

class Header extends React.Component {
    render () {
        return (
            <header>
                <Logo />
                <h1>Minesweeper</h1>                
            </header>
        )
    }
}

class MinesCount extends React.Component {
    render () {
        return (
            <span className={ styles.digital }>10</span>
        )
    }
}

class Emoticon extends React.Component {

    render () {

        // const classNameMap = {
        //     lost: styles.lost,
        //     won: styles.won,
        //     clicked: styles.ups
        // }          

        // const className = [
        //     styles.btnEmoticon,
        //     classNameMap
        // ].join(" ");

        return (
            <button className={ styles.btnEmoticon } onClick={ () => this.props.onNewGame() }></button>
        )
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        }
    }

    componentDidMount= () => {
        if (BoardStateEnum === BoardStateEnum.LOST) {
            clearTimeout(this.intervalId);
        } else {
            this.intervalId = setInterval(() => {
                this.setState({
                    seconds: this.state.seconds + 1
                })
            }, 1000)
        }
    };

    componentWillUnmount = () => {
            clearTimeout(this.intervalId);
    };

    render () {
        return (
            <span className={ styles.digital }>{ this.state.seconds }</span>
        )
    }
}

class MainSection extends React.Component {
    render () {
        return (
            <section className= { styles.back }>
               <MinesCount/>
                <Emoticon onNewGame= { this.props.onNewGame }/>
                <Clock/>
            </section>
        )
    }
}

class TopBoarder extends React.Component {
    // let boardSizeToClassName = {
    //     [newGame]: styles.newGame,
    //     [intermediate]: styles.intermediate,
    //     [expert]: styles.expert
    // };
    render () {
        return (
            <div className = { styles.menu }>
                <Header/>
                <MainMenu onShowHelp={ this.props.onShowHelp } onNewGame={ this.props.onNewGame }
                          onNewGameMedium={ this.props.onNewGameMedium }
                          onNewGameExpert={ this.props.onNewGameExpert } />
                <MainSection onNewGame={ this.props.onNewGame }/>
            </div>
        )
    }
}

class TopBar extends React.Component {
    render() {

        return (
            <div id='top_bar' className={ styles.top_bar }>
              <TopBoarder onShowHelp={ this.props.onShowHelp } onNewGame={ this.props.onNewGame } 
                          onNewGameMedium={ this.props.onNewGameMedium } 
                          onNewGameExpert={ this.props.onNewGameExpert }/>
            </div>
        )
    }
}

export default TopBar;
