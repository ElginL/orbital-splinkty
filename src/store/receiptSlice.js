import { createSlice } from '@reduxjs/toolkit';

/*
    activeGroupMembers: [email: 'test1@test.com', ...]
    receiptItems: [{ id: 2, description: 'Nuggets', totalQuantity: 6, quantity: 6, price: 7.20, test1@test.com: 3, test2@test.com: 3 }, ... ]
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
                        id: item.id,
                        totalQuantity: action.payload.totalQuantity
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
        addMemberToReceiptItems: (state, action) => {
            state.receiptItems = state.receiptItems.map(item => {
                if(item && !(action.payload.member in item)) {
                    return {
                        ...item,
                        [action.payload.member]: 0
                    };
                }

                return item;
            });
        },
        editReceiptItemMemberQty: (state, action) => {
            state.receiptItems = state.receiptItems.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: item.quantity - action.payload.quantityDropped,
                        [action.payload.member]: item[action.payload.member] + action.payload.quantityDropped
                    }
                }

                return item;
            })
        },
        emptyReceiptItems: state => {
            state.receiptItems = [];
        }
    }
});

export const {
    addActiveGroupMember,
    removeActiveGroupMember,
    addReceiptItem,
    editReceiptItem,
    deleteReceiptItem,
    addMemberToReceiptItems,
    editReceiptItemMemberQty,
    emptyReceiptItems
} = receiptSlice.actions;
export default receiptSlice.reducer;