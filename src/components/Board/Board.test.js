import { shallow } from 'enzyme';
import Board from './index';

describe('Testing Game\'s Initiall State', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Board/>);
    });

    it('should render game title', () => {
        expect(wrapper.find('.title').text().toLowerCase()).toContain('tic tac toe');
    });

    it('should have two players', () => {
        const players = wrapper.find('.players Player');
        expect(players.length).toBe(2);
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

});

describe('<Board> component with props', () => {

    const props = {
        firstPlayerMarkedCells: [],
        secondPlayerMarkedCells: [],
        activePlayer: "Player 1",
        handleClick: jest.fn(),
        rewindLastMove: jest.fn(),
        resetGame: jest.fn(),
        isGameComplete: false,
        gameResult: undefined
    };
    const wrapper = shallow(<Board {...props} />);

    it('should show active player\'s turn', () => {
        expect(wrapper.find('.players .turn').text().toLowerCase()).toContain('it\'s your turn : player 1');
    });

    it('should triger rewind method when rewind button is clicked', () => {
        wrapper.find('.rewind').simulate('click');
        expect(props.rewindLastMove).toHaveBeenCalledTimes(1);
    });

    it('should triger reset method when reset button is clicked', () => {
        wrapper.find('.reset').simulate('click');
        expect(props.resetGame).toHaveBeenCalledTimes(1);
    });

    it('should not display result until game is complete', () => {
        expect(wrapper.find('.game-result').length).toBe(0);
    });

    it('should show result once game is complete', () => {
        const updatedProps = {...props, isGameComplete: true, gameResult: "Player 2 Won!" }
        const updatedWrapper = shallow(<Board {...updatedProps} />);
        expect(updatedWrapper.find('.game-result').length).toBe(1);
        expect(updatedWrapper.find('.game-result').text().toLowerCase()).toBe('player 2 won!');
    })
});
