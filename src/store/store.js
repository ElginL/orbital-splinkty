import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import friendsReducer from './friendsSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        friendship: friendsReducer
    },
});