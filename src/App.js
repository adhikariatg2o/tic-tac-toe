import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="title">TIC TAC TOE</h1>
        <div className="players">
            <div className="player">Player 1</div>
            <div className="player">Player 2</div>
            <div className="turn">It's your turn : Player 1</div>
        </div>
      <div className="game-board">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
      </div>
        <div className="actions">
            <button className="rewind">REWIND</button>
            <button className="reset">RESET</button>
        </div>
    </div>
  );
}

export default App;
