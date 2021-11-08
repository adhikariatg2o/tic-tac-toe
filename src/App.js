import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="title">TIC TAC TOE</h1>
        <div className="players">
            <div className="player"></div>
            <div className="player"></div>
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
    </div>
  );
}

export default App;
