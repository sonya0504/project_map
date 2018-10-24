import React,{PureComponent} from 'react';
import styles from './App.scss';
import BtnStart from './BtnStart';
import Cell from "./Cell";

class Logo extends React.Component {
    render () {
        return <img src='../../img/mine.jpeg'/>
    }
}

function MainMenu (props) {
        return props.visible && (
            <div onClick={props.menuClick}>
                Game
            </div>
        )
}

function MenuItems({visible, hideClick}) {
    const handleClick = () => {
        hideClick()
    };

    return visible && (
        <div>
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

class Menu extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            itemsVisible: false
        }
    }

    onMainMenuClick () {
        this.setState({ itemsVisible: true})
    };

    onHideClick () {
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
                <h1>Minesweeper</h1>
                <Menu/>
            </header>
        )
    }
}

class MinesCount extends React.Component {

    render () {
        return (
            <span>licznik bomb</span>
        )
    }
}

class Emoticon extends React.Component {
    render () {
        return (
            <button><img src='../../img/emoticons.png'></img></button>
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

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                seconds: this.state.seconds + 1
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render () {
        return (
            <span>{this.state.seconds}</span>
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