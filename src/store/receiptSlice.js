import { createSlice } from '@reduxjs/toolkit';

/*
    activeGroupMembers: [ { email: 'test1@test.com', items: [ { id: 32131, description: 'nuggets', quantity: 3 }, ... ] }, ... ]
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
        addReceiptItem: (state, action) => {
            state.receiptItems = [
                ...state.receiptItems,
                action.payload.newItem
            ];
        },
        setReceiptItems: (state, action) => {
            state.receiptItems = action.payload.receiptItems;
        },
        editReceiptItem: (state, action) => {
            state.receiptItems = state.receiptItems.map(item => {
                if (item.id === action.payload.id) {
                    const initialQtyChange = action.payload.newQuantity - item.initialQuantity;

                    if (initialQtyChange < 0) {
                        // Remove item that is edited from all active group members
                        state.activeGroupMembers = state.activeGroupMembers.map(member => {
                            return {
                                ...member,
                                items: member.items.filter(memberItem => {
                                    return memberItem.description !== item.description
                                })
                            }
                        });

                        // Return new item with all updated fields
                        return {
                            ...item,
                            description: action.payload.newDescription,
                            price: action.payload.newPrice,
                            remainingQuantity: action.payload.newQuantity,
                            initialQuantity: action.payload.newQuantity
                        }
                    }
                    
                    return {
                        ...item,
                        description: action.payload.newDescription,
                        price: action.payload.newPrice,
                        remainingQuantity: item.remainingQuantity + initialQtyChange,
                        initialQuantity: action.payload.newQuantity
                    }
                }
                
                return item;
            })
        },
        deleteReceiptItem: (state, action) => {
            const index = state.receiptItems.findIndex(item => item.id === action.payload.id);

            state.activeGroupMembers = state.activeGroupMembers.map(member => {
                return {
                    ...member,
                    items: member.items.filter(item => item.id !== action.payload.id)
                }
            })

            state.receiptItems = [
                ...state.receiptItems.slice(0, index),
                ...state.receiptItems.slice(index + 1)
            ];
        },
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

            const memberItems = state.activeGroupMembers[removeIndex].items;

            state.receiptItems = state.receiptItems.map(item => {
                const itemIndex = memberItems.findIndex(memberItem => {
                    return memberItem.description === item.description
                });

                if (itemIndex !== -1) {
                    return {
                        ...item,
                        remainingQuantity: item.remainingQuantity + memberItems[itemIndex].quantity
                    }
                }

                return item;
            })

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

                    // Item is not in items array of active group member.
                    if (itemIndex === -1) {
                        return {
                            ...member,
                            items: [
                                ...member.items,
                                newItem
                            ]
                        }
                    }

                    return {
                        ...member,
                        items: member.items.map(item => {
                            if (item.description === newItem.description) {
                                return {
                                    ...newItem,
                                    quantity: item.quantity + newItem.quantity,
                                }
                            }

                            return item;
                        }),
                    }
                }

                return member;
            })
        },
        changeRemainingQtyInReceiptItems: (state, action) => {
            state.receiptItems = state.receiptItems.map(item => {
                if (item.id === action.payload.itemId) {
                    return {
                        ...item,
                        remainingQuantity: action.payload.method === "DECREMENT"
                            ? item.remainingQuantity - action.payload.qtyChange
                            : item.remainingQuantity + action.payload.qtyChange
                    }
                }

                return item;
            })
        },
        deleteItemFromMember: (state, action) => {
            state.activeGroupMembers = state.activeGroupMembers.map(member => {
                if (member.email === action.payload.email) {
                    return {
                        ...member,
                        items: member.items.filter(item => item.id !== action.payload.itemId),
                    }
                }

                return member;
            })
        },
        emptyReceiptStore: state => {
            state.receiptItems = [];
            state.activeGroupMembers = [];
        },
    }
});

export const {
    addReceiptItem,
    setReceiptItems,
    editReceiptItem,
    deleteReceiptItem,
    addActiveGroupMember,
    removeActiveGroupMember,
    addItemToMember,
    changeRemainingQtyInReceiptItems,
    deleteItemFromMember,
    emptyReceiptStore,
} = receiptSlice.actions;
export default receiptSlice.reducer;