import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import friendsReducer from './friendsSlice';
import receiptReducer from './receiptSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        friendship: friendsReducer,
        receipt: receiptReducer
    },
});