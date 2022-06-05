import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

/*
    friendsWithPayments: [
        { data: { otherUser: "test@test.com", payments: { otherToUser: 0, userToOther: 0 }, user: "test1@test.com" }, id: 342424 },
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
    top3Payments: []
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
        resetFriends: (state) => {
            state.friendsWithPayments = [];
            state.friendsEmail = [];
            state.friendRequests = [];
            state.sentFriendRequests = [];
        },
        extractTop3Payments: (state) => {
            const copy = state.friendsWithPayments.slice();
            copy.sort(function(a, b){return b.data.payments.payment - a.data.payments.payment});
            console.log(copy);
        }
    }
});
    
export const {
    addFriendWithPayments, 
    resetFriends, 
    addFriendEmail, 
    addFriendRequest,
    addSentFriendRequest,
    deleteFriendRequest,
    extractTop3Payments
} = friendsSlice.actions;
export default friendsSlice.reducer;