import { configureStore } from '@reduxjs/toolkit';
import currUserReducer from './currUserSlice';
import usersReducer from './usersSlice';
import friendsReducer from './friendsSlice';
import receiptReducer from './receiptSlice';

export const store = configureStore({
    reducer: {
        currUser: currUserReducer,
        users: usersReducer,
        friendship: friendsReducer,
        receipt: receiptReducer
    },
});