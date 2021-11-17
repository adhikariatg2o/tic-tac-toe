import { shallow } from 'enzyme';
import Player from './index';


describe('<Player> Component', () => {
    const props = {
        name: 'Some Player',
        signLabel: 'Player Sign Label'
    };
    const wrapper = shallow(<Player {...props} />);

    it('should render player section', () => {
        expect(wrapper.find('.player').length).toBe(1);
    });

    it('should display player name', () => {
        expect(wrapper.find('.player .name').text().toLowerCase()).toBe('some player')
    });

    it('should display player sign label', () => {
        expect(wrapper.find('.player .player-sign').text().toLowerCase()).toContain('player sign label')
    });
});