import { render, fireEvent } from '@testing-library/react-native';
import { useSelector } from 'react-redux';
import FriendsSearchBar from '../../screens/FriendsSearchBar';

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

describe("Friend Search Bar", () => {
    it("User is searchable by full text", async () => {
        mockWithResults();

        const { findByText, getByPlaceholderText } = render(<FriendsSearchBar />);
    
        fireEvent.changeText(getByPlaceholderText("Search For Friends"), "findme@findme.com");
    
        await findByText("findme@findme.com");
    });

    it("User is not searchable if he is in your friend list", async () => {
        mockWithoutResults();

        const { queryAllByText, getByPlaceholderText } = render(<FriendsSearchBar />);

        fireEvent.changeText(getByPlaceholderText("Search For Friends"), "friend1");
        
        expect(queryAllByText("friend1@f.com").length).toBe(0);
        expect(queryAllByText("friend2@f.com").length).toBe(0);
        expect(queryAllByText("friend3@f.com").length).toBe(0);
    })

    it("User is not searchable if he is in your incoming requests", async () => {
        mockWithoutResults();
       
        const { queryAllByText, getByPlaceholderText } = render(<FriendsSearchBar />);

        fireEvent.changeText(getByPlaceholderText("Search For Friends"), "inReq");
        
        expect(queryAllByText("inReq1@req.com").length).toBe(0);
        expect(queryAllByText("inReq2@req.com").length).toBe(0);
    })
})

function mockWithResults() {
    useSelector
        .mockReturnValueOnce({}) // photoURLS
        .mockReturnValueOnce(["friend1@f.com", "friend2@f.com", "friend3@f.com"]) // friendsEmail
        .mockReturnValueOnce([{ from: "inReq1@req.com", id: 1 }, { from: "inReq2@req.com", id: 2 }]) // friendRequests
        .mockReturnValueOnce([
            { email: "friend1@f.com", id: 1 }, 
            { email: "friend2@f.com", id: 2 },
            { email: "friend3@f.com", id: 3 },
            { email: "inReq1@req.com", id: 4 },
            { email: "inReq2@req.com", id: 5 },
            { email: "findme@findme.com", id: 6 },
            { email: "findme2@findme.com", id: 7 }
        ]) // allUsers
        .mockReturnValueOnce({}) // photoURLS
        .mockReturnValueOnce(["friend1@f.com", "friend2@f.com", "friend3@f.com"]) // friendsEmail
        .mockReturnValueOnce([{ from: "inReq1@req.com", id: 1 }, { from: "inReq2@req.com", id: 2 }]) // friendRequests
        .mockReturnValueOnce([
            { email: "friend1@f.com", id: 1 }, 
            { email: "friend2@f.com", id: 2 },
            { email: "friend3@f.com", id: 3 },
            { email: "inReq1@req.com", id: 4 },
            { email: "inReq2@req.com", id: 5 },
            { email: "findme@findme.com", id: 6 },
            { email: "findme2@findme.com", id: 7 }
        ]) // allUsers
        .mockReturnValueOnce([{ to: "hel@eas.com", id: 1 }]) // outgoingFriendRequests
        .mockReturnValueOnce({}) // Notification tokens
}

function mockWithoutResults() {
    useSelector
        .mockReturnValueOnce({}) // photoURLS
        .mockReturnValueOnce(["friend1@f.com", "friend2@f.com", "friend3@f.com"]) // friendsEmail
        .mockReturnValueOnce([{ from: "inReq1@req.com", id: 1 }, { from: "inReq2@req.com", id: 2 }]) // friendRequests
        .mockReturnValueOnce([
            { email: "friend1@f.com", id: 1 }, 
            { email: "friend2@f.com", id: 2 },
            { email: "friend3@f.com", id: 3 },
            { email: "inReq1@req.com", id: 4 },
            { email: "inReq2@req.com", id: 5 },
            { email: "findme@findme.com", id: 6 },
            { email: "findme2@findme.com", id: 7 }
        ]) // allUsers
        .mockReturnValueOnce({}) // photoURLS
        .mockReturnValueOnce(["friend1@f.com", "friend2@f.com", "friend3@f.com"]) // friendsEmail
        .mockReturnValueOnce([{ from: "inReq1@req.com", id: 1 }, { from: "inReq2@req.com", id: 2 }]) // friendRequests
        .mockReturnValueOnce([
            { email: "friend1@f.com", id: 1 }, 
            { email: "friend2@f.com", id: 2 },
            { email: "friend3@f.com", id: 3 },
            { email: "inReq1@req.com", id: 4 },
            { email: "inReq2@req.com", id: 5 },
            { email: "findme@findme.com", id: 6 },
            { email: "findme2@findme.com", id: 7 }
        ]) // allUsers
}
