import './Board.css';
import Player from './Player';
import Grid from './Grid';
import {
    FIRST_PLAYER_SIGH,
    FIRST_PLAYER_NAME,
    SECOND_PLAYER_NAME,
    SECOND_PLAYER_SIGN,
    NUMBER_OF_CELLS,
    PLAYER_SIGN_LABEL,
} from '../../constants/Constants';

function Board(props) {
    const {
        activePlayer,
        firstPlayerMarkedCells,
        secondPlayerMarkedCells ,
        handleClick,
        rewindLastMove,
        resetGame,
        isGameComplete,
        gameResult,
    } = props;
    return (
       <div>
           <h1 className="title">TIC TAC TOE</h1>
           <div className="players">
               <Player name={ FIRST_PLAYER_NAME } signLabel={PLAYER_SIGN_LABEL[FIRST_PLAYER_SIGH]} />
               <div className="turn">It's your turn : {activePlayer}</div>
               <Player name={ SECOND_PLAYER_NAME } signLabel={PLAYER_SIGN_LABEL[SECOND_PLAYER_SIGN]} />
           </div>
           <Grid number_of_cells={NUMBER_OF_CELLS} firstPlayerMarkedCells={firstPlayerMarkedCells} secondPlayerMarkedCells={secondPlayerMarkedCells} handleClick={handleClick} />
           { isGameComplete && <div className="game-result">{gameResult}</div> }
           <div className="actions">
               <button className="rewind" onClick={rewindLastMove}>REWIND</button>
               <button className="reset" onClick={resetGame}>RESET</button>
           </div>
       </div>
    );
}

export default Board;