import React from 'react';
import styles from './App.scss';
import {BoardStateEnum} from "minesweeper";

class Logo extends React.Component {
    render () {
        return <img src='./img/mine.jpeg'/>
    }
}

function MainMenu (props) {
        return props.visible && (
            <ul>
                <div onClick={props.menuClick}>
                    Game
                </div>
            </ul>
        )
}

function MenuItems({visible, hideClick}) {
    const handleClick = () => {
        hideClick()
    };

    return visible && (
        <div className={'hidden'}>
            <ul>
                <li>New</li>
                <li>Beginner</li>
                <li>Intermediate</li>
                <li>Expert</li>
                <li>Custom...</li>
            </ul>
            <div onClick={handleClick}>Close</div>
        </div>
    )
}

class Menu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            itemsVisible: false
        }
    }

    onMainMenuClick = () => {
        this.setState({ itemsVisible: true})
    };

    onHideClick = () => {
        this.setState({ itemsVisible: false})
    };

    render () {
        const { itemsVisible } = this.state;
        return (
            <menu>
            <MainMenu menuClick={this.onMainMenuClick} visible={!itemsVisible}/>
            <MenuItems hideClick={this.onHideClick} visible={itemsVisible}/>
            </menu>
        )
    }
}

class Header extends React.Component {
    render () {
        return (
            <header>
                <Logo />
                <span>Minesweeper</span>
                <Menu/>
            </header>
        )
    }
}

class MinesCount extends React.Component {

    render () {
        return (
            <span id='minesCount'>10</span>
        )
    }
}

class Emoticon extends React.Component {
    render () {
        return (
            <button id='btnEmoticon'><img src='./img/emoticons.png'></img></button>
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
            <span id='clock'>{this.state.seconds}</span>
        )
    }
}

class MainSection extends React.Component {
    render () {
        return (
            <section>
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
                <MainSection/>
            </div>
        )
    }
}

class TopBar extends React.Component {
    render() {
        return (
            <div id='top_bar' style={styles}>
              <TopBoarder/>
            </div>
        )
    }
}

export default TopBar;
