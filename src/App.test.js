import { shallow } from 'enzyme';
import App from './App';

describe('Testing Game\'s Initiall State', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('should render game title', () => {
    expect(wrapper.find('.title').text().toLowerCase()).toContain('tic tac toe');
  });

  it('should have game board rendered', () => {
    expect(wrapper.find('.App .game-board').length).toBe(1);
  });

  it('should contain nine cells on the game borad', () => {
    expect(wrapper.find('.game-board .cell').length).toBe(9);
  });

  it('should have two players', () => {
    const players = wrapper.find('.players .player');
    expect(players.length).toBe(2);
    expect(players.first().text().toLowerCase()).toBe('player 1');
    expect(players.last().text().toLowerCase()).toBe('player 2');
  });

  it('should have two action buttons', () => {
    expect(wrapper.find('.actions button').length).toBe(2);
  });

  it('should have rewind button', () => {
    const rewindButton = wrapper.find('.actions .rewind');
    expect(rewindButton.length).toBe(1);
    expect(rewindButton.text().toLowerCase()).toBe('rewind');
  });

  it('should have reset button', () => {
    const resetButton = wrapper.find('.actions .reset');
    expect(resetButton.length).toBe(1);
    expect(resetButton.text().toLowerCase()).toBe('reset');
  });

  it('should show which player\'s turn it is', () => {
    const playerTurn = wrapper.find('.players .turn');
    expect(playerTurn.length).toBe(1);
    expect(playerTurn.text().toLowerCase()).toContain('it\'s your turn');
  });

  it('should show first player\'s turn initially(by default', () => {
    expect(wrapper.find('.players .turn').text().toLowerCase()).toContain('it\'s your turn : player 1');
  });
});
