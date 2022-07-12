import { createSlice } from '@reduxjs/toolkit';

// users: [ { email: "test@test.com", id: 432432 }, ...]
// profilePictures: { "test1@test.com": url, "test2@test.com": url, ... }
const initialState = {
    users: [],
    profilePictures: {},
    notificationTokens: {}
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.usersEmail;
        },
        addUserPic: (state, action) => {
            state.profilePictures = {
                ...state.profilePictures,
                [action.payload.email]: action.payload.profilePic
            }
        },
        addUserNotifToken: (state, action) => {
            state.notificationTokens = {
                ...state.notificationTokens,
                [action.payload.email]: action.payload.token
            }
        },
    }
});

export const { 
    setUsers,
    addUserPic,
    addUserNotifToken,
} = usersSlice.actions;

export default usersSlice.reducer;