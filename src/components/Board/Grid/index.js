import './Grid.css';
import {
    FIRST_PLAYER_SIGH,
    SECOND_PLAYER_SIGN,
    BLANK_SPACE,
} from '../../../constants/Constants';

function Grid(props) {

    const { number_of_cells, firstPlayerMarkedCells, secondPlayerMarkedCells, handleClick } = props;

    const renderGrids = () => {
        let CELLS = [];
        for(let index = 0; index < number_of_cells; index++) {
            let classNames = "cell";
            if (firstPlayerMarkedCells.includes(index)) classNames += BLANK_SPACE + FIRST_PLAYER_SIGH;
            if (secondPlayerMarkedCells.includes(index)) classNames += BLANK_SPACE + SECOND_PLAYER_SIGN;
            CELLS.push( <div className={classNames} onClick={handleClick} key={index} data-cell-index={index}></div>)
        }
        return CELLS;
    };

    return (
        <div className="game-board">
            { renderGrids() }
        </div>
    );
}

export default Grid;