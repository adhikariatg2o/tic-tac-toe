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
    const WIN_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let PLAYER_NAMES = [];
    PLAYER_NAMES[FIRST_PLAYER_SIGH] = FIRST_PLAYER_NAME;
    PLAYER_NAMES[SECOND_PLAYER_SIGN] = SECOND_PLAYER_NAME;

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
            } else if (checkDraw()) {
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

    const checkDraw = () => {
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
                <div className="player">{FIRST_PLAYER_NAME}</div>
                <div className="turn">It's your turn : {activePlayer}</div>
                <div className="player">{SECOND_PLAYER_NAME}</div>
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
