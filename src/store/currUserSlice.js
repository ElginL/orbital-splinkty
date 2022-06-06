import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

const initialState = {
    email: "",
    totalin: 0,
    totalout: 0,
    peoplein: 0,
    peopleout: 0,
    top3Payments: []
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
        },
        addTopPayment: (state, action) => {
            const index = state.top3Payments.findIndex(el => isEqual(el, action.payload.friend) ||
                el.id === action.payload.friend.id);

            if (index === -1) {
                if (state.top3Payments.length == 3) {
                    state.top3Payments[2] = action.payload.friend;
                } else {
                    state.top3Payments = [ ...state.top3Payments, action.payload.friend ];
                }
            } else {
                state.top3Payments[index] = action.payload.friend;
            }
            state.top3Payments.sort(function(a, b){return b.data.payments.payment - a.data.payments.payment});
        },
        getTop3Payments: (state) => {
            const copy = state.top3Payments.slice();
            console.log(copy);
        },
        resetTop3Payments: (state) => {
            state.top3Payments = [];
        }
    }
});

export const { 
    setData,
    addTopPayment,
    getTop3Payments,
    resetTop3Payments
} = currUserSlice.actions;

export default currUserSlice.reducer;