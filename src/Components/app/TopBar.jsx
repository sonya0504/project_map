import React from 'react';
import styles from './App.scss';
import mineSrc from "./img/mine.jpeg";
import flagSrc from "./img/flag.png";
import mineExplodeSrc from "./img/mineExplode.png";
import App from "./App";
import {CellStateEnum, BoardStateEnum, CellFlagEnum, /*cell.isMine*/} from "minesweeper";

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

    //  menuClick = () => {
    //     this.setState({
    //         clicked: !this.state.clicked
    //     });
    // };

    // showMines = () => {
    //     if (cell.isMine) {
    //             return (
    //             <div className={ className }><img src={ mineSrc }/></div>
    //             )
    //         }
    //     }
    

    render () {

        return <div className={ styles.menu }>
                    { this.state.clicked && <ul className={styles.menuItem} >
                        <li>New</li>
                        <li>Beginner</li>
                        <li>Intermediate</li>
                        <li>Expert</li>
                        <li>Custom...</li>
                    </ul> }
                    <div className={ styles.gameBtn } onClick={ this.menuClick } >Game</div>
                    <div className={ styles.help } onClick={ this.showMines }>Help</div>
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

    newGame = () => {
        <App/>
    }

    render () {
        return (
            <button className={ styles.btnEmoticon } onClick={ this.newGame }></button>
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
                <Emoticon/>
                <Clock/>
            </section>
        )
    }
}

class TopBoarder extends React.Component {
    render () {
        return (
            <div>
                <Header/>
                <MainMenu/>
                <MainSection/>
            </div>
        )
    }
}

class TopBar extends React.Component {
    render() {

        return (
            <div id='top_bar' className={ styles.top_bar }>
              <TopBoarder/>
            </div>
        )
    }
}

export default TopBar;
