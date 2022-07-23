import { render } from '@testing-library/react-native';
import YourFriends from '../../screens/YourFriends';
import { useSelector } from 'react-redux';

jest.mock('react-redux');

describe("YourFriends page is rendered correctly", () => {
    it("no friends render", () => {
        useSelector.mockImplementation(() => []);

        const { getByText } = render(<YourFriends />);

        getByText(/No Friends Yet.../);
        getByText(/Press Magnifying Glass to search for friends/);
    }),

    it("a mixture of friends to pay, friends to receive and no payment required", () => {
        useSelector.mockImplementation(() => [
            {
                amount: 6.5,
                friend: 'test1@test.com',
                isOweFriend: true,
                id: 1
            },
            {
                amount: 2.34,
                friend: 'test2@test.com', 
                isOweFriend: false,
                id: 2
            },
            {
                amount: 0, 
                friend: 'test3@test.com', 
                isOweFriend: true,
                id: 3
            }
        ]);

        const { getAllByText, getByText } = render(<YourFriends />);

        getByText("test1@test.com");
        getByText("test2@test.com");
        getByText("test3@test.com");

        expect(getAllByText("Pay").length).toBe(1);
        expect(getAllByText("Nudge").length).toBe(1);
        
        getByText("$6.50");
        getByText("$2.34");
        getByText("$0");
    })
})