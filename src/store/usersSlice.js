import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

// users: [ { email: "test@test.com", id: 432432}, ...]
const initialState = {
    users: [],
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
        resetUsers: (state) => {
            state.users = [];
        },
    }
});

export const { addUser, resetUsers } = usersSlice.actions;

export default usersSlice.reducer;