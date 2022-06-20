import { createSlice } from '@reduxjs/toolkit';

/*
    friendsWithPayments: [
        { amount: 99, friend: 'test1@test.com', isOweFriend: true, id: 43242 },
        ...
    ]

    friendsEmail: [ "test@test.com", "elgin@elgin.com", ... ]

    friendRequests: [ { from: "test@test.com", id: 324234 }, ...]

    sentFriendRequests: { to: "test@test.com", id: 432432 }, ...]
*/
const initialState = {
    friendsWithPayments: [],
    friendsEmail: [],
    friendRequests: [],
    sentFriendRequests: [],
}

export const friendsSlice = createSlice({
    name: 'friendship',
    initialState,
    reducers: {
        setFriendsWithPayments: (state, action) => {
            state.friendsWithPayments = action.payload.friendsWithPayments;
        },
        setFriendsEmail: (state, action) => {
            state.friendsEmail = action.payload.friendsEmail;
        },
        setIncomingFriendRequests: (state, action) => {
            state.friendRequests = action.payload.incomingRequests;
        },
        setSentFriendRequests: (state, action) => {
            state.sentFriendRequests = action.payload.sentRequests;
        },
    }
});
    
export const {
    setFriendsWithPayments,
    setFriendsEmail,
    setSentFriendRequests,
    setIncomingFriendRequests,
} = friendsSlice.actions;
export default friendsSlice.reducer;