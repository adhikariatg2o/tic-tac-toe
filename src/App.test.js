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
});