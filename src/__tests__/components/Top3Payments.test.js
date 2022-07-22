import { render } from '@testing-library/react-native';
import Top3Payments from '../../components/Top3Payments';
import { useSelector } from 'react-redux';

jest.mock('react-redux');

it("renders empty Top3Payments page correctly", () => {
    useSelector.mockImplementation(() => []);

    const { getByText } = render(<Top3Payments />);

    // Heading "Top Payments" exists.
    getByText("Top Payments");

    getByText("No Outstanding Payments!");
})

describe("renders Top3Payments contacts correctly", () => {
    it("sorts by amount and renders only 3 top payments", () => {
        useSelector.mockImplementation(() => [
                {
                    amount: 6.50, 
                    friend: 'test1@test.com', 
                    isOweFriend: true, 
                    id: Math.random(1000)
                },
                {
                    amount: 3,
                    friend: 'test2@test.com',
                    isOweFriend: true,
                    id: Math.random(1000)
                },
                {
                    amount: 9.10,
                    friend: 'test3@test.com',
                    isOweFriend: true,
                    id: Math.random(1000)
                },
                {
                    amount: 8.70,
                    friend: 'test4@test.com',
                    isOweFriend: true,
                    id: Math.random(1000)
                }
            ]);

        const { queryAllByText, getByText } = render(<Top3Payments />);

        const top3 = queryAllByText(/test[1-4]@test.com/);
        expect(top3.length).toBe(3);

        getByText("test3@test.com");
        getByText("test4@test.com");
        getByText("test1@test.com");
        
        // Should not show up because it has to lowest amount.
        expect(queryAllByText("test2@test.com").length).toBe(0);
    })
})