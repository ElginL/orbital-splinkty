import { createSlice } from '@reduxjs/toolkit';

// users: [ { email: "test@test.com", id: 432432 }, ...]
// profilePictures: { "test1@test.com": url, "test2@test.com": url, ... }
const initialState = {
    users: [],
    profilePictures: {}
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.usersEmail;
        },
        setProfilePictures: (state, action) => {
            state.profilePictures = action.payload.profilePictures;
        }
    }
});

export const { 
    setUsers,
    setProfilePictures
} = usersSlice.actions;

export default usersSlice.reducer;