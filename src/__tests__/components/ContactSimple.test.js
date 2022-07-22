import { render } from '@testing-library/react-native';
import ContactSimple from '../../components/ContactSimple';

describe("renders ContactSimple correctly", () => {
    it("is owe friend", () => {
        const component = (
            <ContactSimple
                item={{ amount: 6.50, friend: 'test1@test.com', isOweFriend: true }}
            />
        );

        const { getByText } = render(component);
        
        // Person to pay name is present.
        getByText("test1@test.com");
        
        // Makes sure that it is a payment text.
        getByText("To Pay");

        // Make sure that the amount is present.
        getByText("$6.50");
    })

    it("not owe friend", () => {
        const component = (
            <ContactSimple
                item={{ amount: 4, friend: 'test2@test.com', isOweFriend: false }}
            />
        );

        const { getByText } = render(component);

        // Person to receive from name is present.
        getByText("test2@test.com");

        // Makes sure that it is a receive text
        getByText("To Receive");

        // Make sure the amount is correct.
        getByText("$4.00");
    })
})