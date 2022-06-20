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
        addItemToMember: (state, action) => {
            const newItem = action.payload.newItem;
            
            state.activeGroupMembers = state.activeGroupMembers.map(member => {
                if (member.email === action.payload.memberToEdit) {
                    const itemIndex = member.items.findIndex(item => {
                        return item.description === newItem.description;
                    });

                    if (itemIndex === -1) {
                        return {
                            email: member.email,
                            items: [
                                ...member.items,
                                newItem
                            ],
                            totalPrice: parseFloat((member.totalPrice + newItem.priceShare).toFixed(2))
                        }
                    }

                    return {
                        email: member.email,
                        items: member.items.map(item => {
                            if (item.description === newItem.description) {
                                return {
                                    ...newItem,
                                    quantity: member.items[itemIndex].quantity + newItem.quantity,
                                    priceShare: parseFloat((item.priceShare + newItem.priceShare).toFixed(2))
                                }
                            }

                            return item;
                        }),
                        totalPrice: parseFloat((member.totalPrice + newItem.priceShare).toFixed(2))
                    }
                }

                return member;
            })
        },
        deleteItemFromMember: (state, action) => {
            state.activeGroupMembers = state.activeGroupMembers.map(member => {
                if (member.email === action.payload.email) {
                    return {
                        ...member,
                        items: member.items.filter(item => item.id !== action.payload.itemId),
                        totalPrice: parseFloat((action.payload.totalPrice).toFixed(2))
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
                        price: item.price + action.payload.priceChange,
                        remainingQuantity: action.payload.remainingQuantity,
                        initialQuantity: action.payload.initialQuantity,
                        id: item.id,
                    }
                }

                return item;
            })
        },
        changeReceiptItemRemainingQuantity: (state, action) => {
            state.receiptItems = state.receiptItems.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        remain
                    }
                }
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
        },
        emptyActiveGroupMembers: state => {
            state.activeGroupMembers = [];
        },
        resetReceiptRemainingToInitial: state => {
            state.receiptItems = state.receiptItems.map(item => {
                return {
                    ...item,
                    remainingQuantity: item.initialQuantity
                };
            });
        } 
    }
});

export const {
    addActiveGroupMember,
    removeActiveGroupMember,
    addItemToMember,
    addReceiptItem,
    editReceiptItem,
    deleteItemFromMember,
    deleteReceiptItem,
    setReceiptItems,
    emptyReceiptStore,
    emptyActiveGroupMembers,
    resetReceiptRemainingToInitial
} = receiptSlice.actions;
export default receiptSlice.reducer;