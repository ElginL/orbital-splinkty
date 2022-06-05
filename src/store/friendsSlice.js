import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

/*
    friendsWithPayments: [
        { data: { otherUser: "test@test.com", payments: { isOweOtherUser: true, payment: 0 }, user: "test1@test.com" }, id: 342424 },
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
    sentFriendRequests: []
}

export const friendsSlice = createSlice({
    name: 'friendship',
    initialState,
    reducers: {
        addFriendWithPayments: (state, action) => {
            const index = state.friendsWithPayments.findIndex(el => isEqual(el, action.payload.friend) ||
                el.id === action.payload.friend.id);

            if (index === -1) {
                state.friendsWithPayments = [ ...state.friendsWithPayments, action.payload.friend ];
            }
        },
        addFriendEmail: (state, action) => {
            const index = state.friendsEmail.findIndex(el => isEqual(el, action.payload.friend));

            if (index === -1) {
                state.friendsEmail = [ ...state.friendsEmail, action.payload.friend ];
            }
        },
        addFriendRequest: (state, action) => {
            const index = state.friendRequests.findIndex(el => el.id === action.payload.request.id
                || el.from === action.payload.request.from);

            if (index === -1) {
                state.friendRequests = [ ...state.friendRequests, action.payload.request ];
            }
        },
        addSentFriendRequest: (state, action) => {
            const index = state.sentFriendRequests.findIndex(el => el.id === action.payload.request.id
                || el.to === action.payload.request.to);
                
            if (index === -1) {
                state.sentFriendRequests = [ ...state.sentFriendRequests, action.payload.request ];
            }
        },
        deleteFriendRequest: (state, action) => {
            const index = state.friendRequests.findIndex(el => el.id === action.payload.id);
            
            if (index > -1) {
                state.friendRequests.splice(index, 1);
            }
        },
        deleteSentFriendRequest: (state, action) => {
            const index = state.sentFriendRequests.findIndex(el => el.id === action.payload.id);

            if (index > -1) {
                state.sentFriendRequests.splice(index, 1);
            }
        },
        deleteFriendship: (state, action) => {
            const emailIndex = state.friendsEmail.findIndex(email => email === action.payload.friendEmail);

            if (emailIndex > -1) {
                state.friendsEmail.splice(emailIndex, 1);
            }

            const paymentIndex = state.friendsWithPayments.findIndex(el => el.id === action.payload.id);

            if (paymentIndex > -1) {
                state.friendsWithPayments.splice(paymentIndex, 1);
            }

        },
        resetFriends: (state) => {
            state.friendsWithPayments = [];
            state.friendsEmail = [];
            state.friendRequests = [];
            state.sentFriendRequests = [];
        },
    }
});
    
export const {
    addFriendWithPayments, 
    resetFriends, 
    addFriendEmail, 
    addFriendRequest,
    addSentFriendRequest,
    deleteFriendRequest,
    deleteSentFriendRequest,
    deleteFriendship
} = friendsSlice.actions;
export default friendsSlice.reducer;