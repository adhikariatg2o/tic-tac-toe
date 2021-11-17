import './Player.css';

function Player(props) {
    const {name, signLabel} = props;

    return (
        <div className="player">
            <span className="name">{name}</span>
            <div className="player-sign">Player Sign : { signLabel }</div>
        </div>
    )
}

export default Player;
