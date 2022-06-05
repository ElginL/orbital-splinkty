import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

const initialState = {
    email: "",
    totalin: 0,
    totalout: 0,
    peoplein: 0,
    peopleout: 0,
};

export const currUserSlice = createSlice({
    name: 'currUser',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.email = action.payload.email;
            state.totalin = action.payload.totalin;
            state.totalout = action.payload.totalout;
            state.peoplein = action.payload.peopleToReceive;
            state.peopleout = action.payload.peopleToPay;
        },
        incrementPeopleIn: (state) => {
            state.peoplein += 1;
        },
        incrementPeopleOut: (state) => {
            state.peopleout += 1;
        },
        decrementPeopleIn: (state) => {
            state.peoplein -= 1;
        },
        decrementPeopleOut: (state) => {
            state.peopleout -= 1;
        }
    }
});

export const { 
    setData
} = currUserSlice.actions;

export default currUserSlice.reducer;