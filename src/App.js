import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    const FIRST_PLAYER_SIGH = "cross";
    const FIRST_PLAYER_NAME = "Player 1"
    const SECOND_PLAYER_SIGN = "circle";
    const SECOND_PLAYER_NAME = "Player 2";
    const DEFAULT_ACTIVE_PLAYER = FIRST_PLAYER_NAME;
    const NUMBER_OF_CELLS = 9;
    const BLANK_SPACE = " ";

    let PLAYER_NAMES = [];
    PLAYER_NAMES[FIRST_PLAYER_SIGH] = FIRST_PLAYER_NAME;
    PLAYER_NAMES[SECOND_PLAYER_SIGN] = SECOND_PLAYER_NAME;

    let [firstPlayerMarkedCells, setFirstPlayerMarkedCells] = useState([]);
    let [secondPlayerMarkedCells, setSecondPlayerMarkedCells] = useState([]);
    let [firstPlayersTurn, setFirstPlayrsTurn] = useState(true);
    let [activePlayer, setActivePlayer] = useState(DEFAULT_ACTIVE_PLAYER);

    const handleClick = (event) => {
        const cell = event.target;
        const cellIndex = parseInt(cell.dataset.cellIndex);
        if(firstPlayersTurn) {
            firstPlayerMarkedCells.push(cellIndex);
            setFirstPlayerMarkedCells([...firstPlayerMarkedCells]);
        } else {
            secondPlayerMarkedCells.push(cellIndex);
            setSecondPlayerMarkedCells([...secondPlayerMarkedCells])
        }
        switchTurn();
    };

    const switchTurn = () => {
        firstPlayersTurn = !firstPlayersTurn;
        setFirstPlayrsTurn(firstPlayersTurn);
        let activePlayerName = SECOND_PLAYER_NAME;
        if (firstPlayersTurn) activePlayerName = FIRST_PLAYER_NAME;
        setActivePlayer(activePlayerName);
    };

    const renderGameBoard = () => {
        let CELLS = [];
        for(let index = 0; index < NUMBER_OF_CELLS; index++) {
            let classNames = "cell";
            if (firstPlayerMarkedCells.includes(index)) classNames += BLANK_SPACE + FIRST_PLAYER_SIGH;
            if (secondPlayerMarkedCells.includes(index)) classNames += BLANK_SPACE + SECOND_PLAYER_SIGN;
            CELLS.push( <div className={classNames} onClick={handleClick} key={index} data-cell-index={index}></div>)
        }

        return CELLS;
    };

    const rewindLastMove = () => {
        if (firstPlayersTurn && secondPlayerMarkedCells.length > 0) {
            secondPlayerMarkedCells.pop();
            setSecondPlayerMarkedCells([...secondPlayerMarkedCells]);
        } else if (firstPlayerMarkedCells.length > 0) {
            firstPlayerMarkedCells.pop();
            setFirstPlayerMarkedCells([...firstPlayerMarkedCells]);
        }
    };

    return (
        <div className="App">
            <h1 className="title">TIC TAC TOE</h1>
            <div className="players">
                <div className="player">{FIRST_PLAYER_NAME}</div>
                <div className="player">{SECOND_PLAYER_NAME}</div>
                <div className="turn">It's your turn : {activePlayer}</div>
            </div>
            <div className="game-board">
                { renderGameBoard() }
            </div>
            <div className="actions">
                <button className="rewind" onClick={rewindLastMove}>REWIND</button>
                <button className="reset">RESET</button>
            </div>
        </div>
    );
}

export default App;
