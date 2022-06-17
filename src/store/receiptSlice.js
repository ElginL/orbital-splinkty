import { createSlice } from '@reduxjs/toolkit';

/*
    activeGroupMembers: [ { email: 'test1@test.com', items: [ { id: 32131, description: 'nuggets', priceShare: 4.32, quantity: 3 }, ... ], totalPrice: 9.43 }, ... ]
    receiptItems: [{ id: 2, description: 'Nuggets', remainingQuantity: 6, initialQuantity: 6, price: 7.20 }, ... ]
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
                return member.email === action.payload.memberToRemove;
            });

            state.activeGroupMembers = [
                ...state.activeGroupMembers.slice(0, removeIndex),
                ...state.activeGroupMembers.slice(removeIndex + 1)
            ];
        },
        editActiveGroupMember: (state, action) => {
            state.activeGroupMembers = state.activeGroupMembers.map(member => {
                if (member.email === action.payload.memberToEdit) {
                    return {
                        email: member.email,
                        items: [
                            ...member.items,
                            action.payload.newItem
                        ],
                        totalPrice: member.totalPrice + action.payload.newItem.priceShare
                    }
                }

                return member;
            })
        },
        addReceiptItem: (state, action) => {
            state.receiptItems = [
                ...state.receiptItems,
                action.payload.newItem
            ];
        },
        editReceiptItem: (state, action) => {
            state.receiptItems = state.receiptItems.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        description: action.payload.description,
                        price: action.payload.price,
                        remainingQuantity: action.payload.remainingQuantity,
                        initialQuantity: action.payload.initialQuantity,
                        id: item.id,
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
        },
        setReceiptItems: (state, action) => {
            state.receiptItems = action.payload.receiptItems;
        },
        emptyReceiptStore: state => {
            state.receiptItems = [];
            state.activeGroupMembers = [];
        }
    }
});

export const {
    addActiveGroupMember,
    removeActiveGroupMember,
    editActiveGroupMember,
    addReceiptItem,
    editReceiptItem,
    deleteReceiptItem,
    setReceiptItems,
    emptyReceiptStore
} = receiptSlice.actions;
export default receiptSlice.reducer;