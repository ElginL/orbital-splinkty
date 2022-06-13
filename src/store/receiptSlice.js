import { createSlice } from '@reduxjs/toolkit';

/*
    activeGroupMembers: [email: 'test1@test.com', ...]
    receiptItems: [{ id: 2, description: 'Nuggets', quantity: 6, price: 7.20 }, ... ]
*/
const initialState = {
    activeGroupMembers: [],
    receiptItems: [],
}

export const receiptSlice = createSlice({
    name: 'receipt',
    initialState,
    reducers: {
        addActiveGroupMember: (state, action) => {
            state.activeGroupMembers = [ 
                ...state.activeGroupMembers, 
                action.payload.newMember
            ];
        },
        removeActiveGroupMember: (state, action) => {
            const removeIndex = state.activeGroupMembers.findIndex(member => {
                return member === action.payload.memberToRemove;
            });

            state.activeGroupMembers = [
                ...state.activeGroupMembers.slice(0, removeIndex),
                ...state.activeGroupMembers.slice(removeIndex + 1)
            ];
        },
        addReceiptItem: (state, action) => {
            const index = state.receiptItems.findIndex(item => {
                return item.description === action.payload.description &&
                    item.price === action.payload.price &&
                    item.quantity === action.payload.quantity;
            });

            if (index === -1) {
                state.receiptItems = [
                    ...state.receiptItems,
                    action.payload.newItem
                ];
            }
        },
        editReceiptItem: (state, action) => {
            state.receiptItems = state.receiptItems.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        description: action.payload.description,
                        quantity: parseInt(action.payload.quantity),
                        price: parseFloat(action.payload.price),
                        id: item.id
                    }
                }

                return item;
            })
        },
        deleteReceiptItem: (state, action) => {
            const index = state.receiptItems.findIndex(item => item.id === action.payload.id);
            state.receiptItems = [
                ...state.receiptItems.slice(0, index),
                ...items.slice(index + 1)
            ];
        }
    }
});

export const {
    addActiveGroupMember,
    removeActiveGroupMember,
    addReceiptItem,
    editReceiptItem,
    deleteReceiptItem
} = receiptSlice.actions;
export default receiptSlice.reducer;