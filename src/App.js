import { useState } from 'react';
import './App.css';
import {
    FIRST_PLAYER_SIGH,
    FIRST_PLAYER_NAME,
    SECOND_PLAYER_NAME,
    SECOND_PLAYER_SIGN,
    DEFAULT_ACTIVE_PLAYER,
    NUMBER_OF_CELLS,
    BLANK_SPACE,
    WIN_COMBINATIONS,
    PLAYER_NAMES,
} from './Constants';

function App() {

    let [firstPlayerMarkedCells, setFirstPlayerMarkedCells] = useState([]);
    let [secondPlayerMarkedCells, setSecondPlayerMarkedCells] = useState([]);
    let [firstPlayersTurn, setFirstPlayrsTurn] = useState(true);
    let [activePlayer, setActivePlayer] = useState(DEFAULT_ACTIVE_PLAYER);
    let [gameResult, setGameResult] = useState(undefined);
    let [isGameComplete, setGameAsComplete] = useState(false);

    const handleClick = (event) => {
        const cell = event.target;
        if (!isGameComplete && !cellIsMarked(cell)) {
            const cellIndex = parseInt(cell.dataset.cellIndex);
            let currentPlayerSign = firstPlayersTurn ? FIRST_PLAYER_SIGH : SECOND_PLAYER_SIGN;
            markCellWithSign(cellIndex);
            if (checkWinner(currentPlayerSign)) {
                setGameResult(PLAYER_NAMES[currentPlayerSign].toUpperCase() + " WON !!");
                setGameAsComplete(true);
            } else if (checkGameDraw()) {
                setGameResult("Game Draw");
                setGameAsComplete(true);
            }
            switchTurn();
        }
    };

    const markCellWithSign = (cellIndex) => {
        if(firstPlayersTurn) {
            firstPlayerMarkedCells.push(cellIndex);
            setFirstPlayerMarkedCells([...firstPlayerMarkedCells]);
        } else {
            secondPlayerMarkedCells.push(cellIndex);
            setSecondPlayerMarkedCells([...secondPlayerMarkedCells])
        }
    };

    const cellIsMarked = (cell) => firstPlayerMarkedCells.includes(parseInt(cell.dataset.cellIndex)) || secondPlayerMarkedCells.includes(parseInt(cell.dataset.cellIndex));

    const checkWinner = (currentPlayerSign) => {
        let currentUsersMarkedCells;
        currentPlayerSign === FIRST_PLAYER_SIGH ? currentUsersMarkedCells = [...firstPlayerMarkedCells] :
            currentUsersMarkedCells = [...secondPlayerMarkedCells];
        return WIN_COMBINATIONS.some(
            combination => combination.every(
                value => currentUsersMarkedCells.includes(value)
            )
        );
    };

    const checkGameDraw = () => {
        return firstPlayerMarkedCells.length + secondPlayerMarkedCells.length === 9;
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
        setGameResult(undefined);
        setGameAsComplete(false);
        switchTurn();
    };

    const resetGame = () => {
        setActivePlayer(DEFAULT_ACTIVE_PLAYER);
        setFirstPlayerMarkedCells([]);
        setSecondPlayerMarkedCells([]);
        setGameResult(undefined);
        setGameAsComplete(false);
    };

    return (
        <div className="App">
            <h1 className="title">TIC TAC TOE</h1>
            <div className="players">
                <div className="player">
                    <span className="name">{FIRST_PLAYER_NAME}</span>
                    <div className="player-sign cross">Player Sgn : X (Cross)</div>
                </div>
                <div className="turn">It's your turn : {activePlayer}</div>
                <div className="player">
                    <span className="name">{SECOND_PLAYER_NAME}</span>
                    <div className="player-sign circle">Player Sign : O (Circle)</div>
                </div>
            </div>
            <div className="game-board">
                { renderGameBoard() }
            </div>
            { isGameComplete && <div className="game-result">{gameResult}</div> }
            <div className="actions">
                <button className="rewind" onClick={rewindLastMove}>REWIND</button>
                <button className="reset" onClick={resetGame}>RESET</button>
            </div>
        </div>
    );
}

export default App;
