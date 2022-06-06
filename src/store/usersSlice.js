import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

// users: [ { email: "test@test.com", id: 432432}, ...]
// profilePictures: { "test1@test.com": url, "test2@test.com": url, ... }
const initialState = {
    users: [],
    profilePictures: {}
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const index = state.users.findIndex(el => isEqual(el, action.payload.user));

            if (index === -1) {
                state.users = [ ...state.users, action.payload.user ];
            }
        },
        addProfilePicture: (state, action) => {
            state.profilePictures = { 
                ...state.profilePictures, 
                [action.payload.userEmail]: action.payload.url 
            }
        },
        resetUsers: (state) => {
            state.users = [];
            state.profilePictures = {};
        },
    }
});

export const { 
    addUser,
    resetUsers, 
    addProfilePicture 
} = usersSlice.actions;

export default usersSlice.reducer;