import { shallow } from 'enzyme';
import Grid from './index';


describe('<Grid> Component Initial State', () => {
    const props = {
        number_of_cells: 9,
        firstPlayerMarkedCells: [],
        secondPlayerMarkedCells: [],
        handleClick: jest.fn()
    };
    const wrapper = shallow(<Grid {...props} />)

    it('should have game board rendered', () => {
        expect(wrapper.find('.game-board').length).toBe(1);
    });

    it('should contain 9 cells on the game borad', () => {
        expect(wrapper.find('.game-board .cell').length).toBe(9);
    });

    it('should not mark any cell initially', () => {
        expect(wrapper.find('.game-board .cross').length).toBe(0);
        expect(wrapper.find('.game-board .circle').length).toBe(0);
    });

    it('should trigger call back method when user clicks on cell', () => {
        wrapper.find('.game-board .cell').at(0).simulate('click');
        expect(props.handleClick).toHaveBeenCalledTimes(1);
    });

});

describe('<BoardGame> Component with marked cell', () => {
    const props = {
        number_of_cells: 9,
        firstPlayerMarkedCells: [0, 3, 5],
        secondPlayerMarkedCells: [4, 6],
        handleClick: jest.fn()
    };
    const wrapper = shallow(<Grid {...props} />)

    it('should mark the cell with corresponding sign of each player based on given props', () => {
        expect(wrapper.find('.game-board .cross').length).toBe(3);
        expect(wrapper.find('.game-board .circle').length).toBe(2);
    });
});
