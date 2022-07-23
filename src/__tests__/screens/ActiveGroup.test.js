import { render } from '@testing-library/react-native';
import ActiveGroup from '../../screens/ActiveGroup';
import { useSelector, Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('react-redux', () => {
    const originalModule = jest.requireActual('react-redux');

    return {
        __esModule: true,
        ...originalModule,
        useSelector: jest.fn(() => [])
    }
})

describe("Active Group page rendered correclty", () => {
    it("When user has no friends in the application", () => {
        const component = (
            <Provider store={store}>
                <ActiveGroup />
            </Provider>
        );

        const { getByText } = render(component);

        getByText(/You do not have friends yet.../);
        getByText(/Click to Add Friends/);
    });

    it("When user has some friends in the application", () => {
        const component = (
            <Provider store={store}>
                <ActiveGroup />
            </Provider>
        );

        useSelector.mockReturnValueOnce(["friend1@f.com", "friend2@f.com", "friend3@f.com"]);

        const { getByText } = render(component);

        getByText("friend1@f.com");
        getByText("friend2@f.com");
        getByText("friend3@f.com");
    })
})