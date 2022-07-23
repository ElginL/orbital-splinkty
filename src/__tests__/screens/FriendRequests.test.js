import { render } from '@testing-library/react-native';
import FriendRequests from '../../screens/FriendRequests';
import { useSelector } from 'react-redux';

jest.mock('firebase/firestore', () => {
    const originalModule = jest.requireActual('firebase/firestore');

    return {
        __esModule: true,
        ...originalModule,
        onSnapshot: jest.fn(col => {})
    }
});

jest.mock('../../firebase/loginAPI', () => {
    const originalModule = jest.requireActual('../../firebase/loginAPI');

    return {
        __esModule: true,
        ...originalModule,
        getCurrentUser: jest.fn(() => "qewtqw@test.com")
    }
});

jest.mock('react-redux');

describe("Friend requests page rendered correctly", () => {
    it("No friend request", () => {
        useSelector
            .mockReturnValueOnce({}) // Notification Tokens
            .mockReturnValueOnce([]) // Incoming Friend Requests
            .mockReturnValueOnce({}) // Profile Pictures

        const { getByText } = render(<FriendRequests />);
        getByText(/No incoming friend requests.../);
    })

    it("Friend requests present", () => {
        useSelector
            .mockReturnValueOnce({}) // Notification Tokens
            .mockReturnValueOnce([
                { from: 'test2@test.com', id: 1 }, 
                { from: 'test3@test.com', id: 2 }, 
                { from: 'test4@test.com', id: 3}
            ]) // Incoming Friend Requests
            .mockReturnValueOnce({}) // Profile Pictures

        const { getByText, getAllByText } = render(<FriendRequests />);

        getByText("test2@test.com");
        getByText("test3@test.com");
        getByText("test4@test.com");

        expect(getAllByText("Confirm").length).toBe(3);
        expect(getAllByText("Decline").length).toBe(3);
    });
});