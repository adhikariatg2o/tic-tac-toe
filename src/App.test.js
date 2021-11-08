import { shallow } from 'enzyme';
import App from './App';

describe('Testing App Component Initiall State', () => {
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
    expect(wrapper.find('.players .player').length).toBe(2);
  });

  it('should have two action buttons', () => {
    expect(wrapper.find('.actions button').length).toBe(2);
  });

  it('should have rewind button', () => {
    const rewindButton = wrapper.find('.actions .rewind');
    expect(rewindButton.length).toBe(1);
    expect(rewindButton.text().toLowerCase()).toBe('rewind');
  });
});