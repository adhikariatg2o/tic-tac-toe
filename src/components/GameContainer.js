import { useState } from 'react';
import {
    FIRST_PLAYER_SIGH,
    FIRST_PLAYER_NAME,
    SECOND_PLAYER_NAME,
    SECOND_PLAYER_SIGN,
    DEFAULT_ACTIVE_PLAYER,
    WIN_COMBINATIONS,
    PLAYER_NAMES,
} from '../constants/Constants';
import Board from './Board';

function GameContainer(props) {
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
        <Board
            firstPlayerMarkedCells={firstPlayerMarkedCells}
            secondPlayerMarkedCells={secondPlayerMarkedCells}
            activePlayer={activePlayer}
            handleClick={handleClick}
            rewindLastMove={rewindLastMove}
            resetGame={resetGame}
            isGameComplete={isGameComplete}
            gameResult={gameResult}
        />
    );
}

export default GameContainer;