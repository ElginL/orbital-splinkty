import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Greeting from '../../components/Greeting'
import { store } from '../../store/store';

jest.mock('../../firebase/loginAPI', () => ({
    getCurrentUser: jest.fn(() => 'test1@test.com')
}));

/* Unit Tests */
describe("renders Greeting component properly", () => {
    it("renders for new account", () => {
        const component = (
            <Provider store={store}>
                <Greeting
                    cashToReceive={0}
                    cashToPay={0}
                    pplToReceiveFromCount={0}
                    pplToPayCount={0}
                />
            </Provider>
        );

        const { getByText, getAllByText } = render(component);

        // Welcome back user rendered correctly
        getByText(/Welcome Back/i);
        getByText("test1@test.com");

        // User payment details rendered correctly
        getByText(/Total to pay:/i);
        expect(getAllByText("$0.00").length).toBe(2);
        getByText("to 0 people");
        getByText(/Total to receive:/i);
        getByText(/from 0 people/i);

    })

    it("renders with data", () => {
        const component = (
            <Provider store={store}>
                <Greeting
                    cashToReceive={6}
                    cashToPay={20}
                    pplToReceiveFromCount={2}
                    pplToPayCount={3}
                />
            </Provider>
        );
    
        const { getByText } = render(component);
    
        // Welcome back user rendered correctly
        getByText(/Welcome Back/i);
        getByText("test1@test.com");
    
        // User payment details rendered correctly
        getByText(/Total to pay:/i);
        getByText("$20.00");
        getByText("to 3 people");
        getByText(/Total to receive:/i);
        getByText("$6.00");
        getByText(/from 2 people/i);
    });

})