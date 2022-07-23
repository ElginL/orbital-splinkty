import { render } from '@testing-library/react-native';
import Contact from '../../components/Contact';

jest.mock('react-redux', () => ({
    useSelector: () => ({})
}));

describe("Contact rendered correctly", () => {
    it("Don't owe one another money", () => {
        const component = (
            <Contact
                item={{ amount: 0, nudgeTime: 0, friend: 'test1@test.com', isOweFriend: true }}
                profileImg={null}
            />
        )
    
        const { queryAllByText, getByText } = render(component);
        
        getByText("$0");
        
        expect(queryAllByText("Pay").length).toBe(0);
        expect(queryAllByText("Nudge").length).toBe(0);
    })

    it("Owe friend money", () => {
        const component = (
            <Contact
                item={{ amount: 17, nudgeTime: 0, friend: 'test2@test.com', isOweFriend: true }}
                profileImg={null}
            />
        )

        const { queryAllByText, getByText } = render(component);
        
        getByText("$17.00");
        getByText("Pay");
        expect(queryAllByText("Nudge").length).toBe(0);
    })

    it("Friend owe you money", () => {
        const component = (
            <Contact
                item={{ amount: 2.21, nudgeTime: 0, friend: 'test3@test.com', isOweFriend: false }}
                profileImg={null}
            />
        )

        const { queryAllByText, getByText } = render(component);

        getByText("$2.21");
        getByText("Nudge");
        expect(queryAllByText("Pay").length).toBe(0);
    })

})