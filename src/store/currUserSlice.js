import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

const initialState = {
    cashToReceive: 0,
    cashToPay: 0,
    pplToPayCount: 0,
    pplToReceiveFromCount: 0,
    top3Payments: [],
    allPayments: []
};

export const currUserSlice = createSlice({
    name: 'currUser',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.cashToReceive = action.payload.cashToReceive;
            state.cashToPay = action.payload.cashToPay;
            state.pplToReceiveFromCount = action.payload.pplToReceiveFromCount;
            state.pplToPayCount = action.payload.pplToPayCount;
        },
        changePplToPayCount: (state, action) => {
            action.payload.isIncrease
                ? state.pplToPayCount += 1
                : state.pplToPayCount -= 1;
        },
        changePplToReceiveFromCount: (state, action) => {
            action.payload.isIncrease
                ? state.pplToReceiveFromCount += 1
                : state.pplToReceiveFromCount -= 1;
        },
        addTopPayment: (state, action) => {
            const index = state.allPayments.findIndex(el => isEqual(el, action.payload.friend)
                || el.id === action.payload.friend.id);
            
            const paymentAmount = action.payload.friend.data.payments.payment;
            if (index === -1) {
                if (paymentAmount !== 0) {
                    state.allPayments = [ ...state.allPayments, action.payload.friend ];
                }
            } else {
                if (paymentAmount !== 0) {
                    state.allPayments[index] = action.payload.friend;
                } else {
                    state.allPayments.splice(index, 1);
                }
            }

            state.allPayments.sort((a, b) => b.data.payments.payment - a.data.payments.payment);
            state.top3Payments = state.allPayments.slice(0, 3);
        },
        resetCurrentUser: (state) => {
            state.cashToReceive = 0;
            state.cashToPay = 0;
            state.pplToPayCount = 0;
            state.pplToReceiveFromCount = 0;
            state.top3Payments = [];
            state.allPayments = [];
        }
    }
});

export const { 
    setData,
    addTopPayment,
    resetCurrentUser
} = currUserSlice.actions;

export default currUserSlice.reducer;