import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [markedCells, setMarkedCells] = useState([]);
    const FIRST_PLAYER_SIGH = "cross";
    const NUMBER_OF_CELLS = 9;
    const BLANK_SPACE = " ";

    const handleClick = (event) => {
        const cell = event.target;
        markedCells.push(cell.cellIndex);
        setMarkedCells([...markedCells]);
    };

    const renderGameBoard = () => {
        let CELLS = [];
        for(let index = 0; index < NUMBER_OF_CELLS; index++) {
            let classNames = "cell";
            if (markedCells.includes(index)) classNames += BLANK_SPACE + FIRST_PLAYER_SIGH;
            CELLS.push( <div className={classNames} onClick={handleClick} key={index} data-cell-index={index}></div>)
        }

        return CELLS;
    };

    return (
        <div className="App">
            <h1 className="title">TIC TAC TOE</h1>
            <div className="players">
                <div className="player">Player 1</div>
                <div className="player">Player 2</div>
                <div className="turn">It's your turn : Player 1</div>
            </div>
            <div className="game-board">
                { renderGameBoard() }
            </div>
            <div className="actions">
                <button className="rewind">REWIND</button>
                <button className="reset">RESET</button>
            </div>
        </div>
    );
}

export default App;
