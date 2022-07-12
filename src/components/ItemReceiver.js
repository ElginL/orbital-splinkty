import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import { DraxView } from 'react-native-drax';
import ItemQuantityModal from './ItemQuantityModal';
import {
    addItemToMember, 
    deleteItemFromMember,
    changeRemainingQtyInReceiptItems
} from '../store/receiptSlice';
import { Entypo } from '@expo/vector-icons';

const ItemReceiver = ({ member, profileImg }) => {
    const dispatch = useDispatch();

    const [modalData, setModalData] = useState({ isVisible: false, payload: null });
    const [isAllDrop, setIsAllDrop] = useState(false);

    useEffect(() => {
        if (isAllDrop && modalData.isVisible === false && modalData.payload !== null) {
            receiveDragDropHandler(1);
        }
    }, [isAllDrop, modalData]);

    const receiveDragDropHandler = quantityDropped => {
        dispatch(addItemToMember({
            memberToEdit: member.email,
            newItem: {
                description: modalData.payload.description,
                quantity: quantityDropped,
                id: modalData.payload.id
            }
        }));

        dispatch(changeRemainingQtyInReceiptItems({
            method: "DECREMENT",
            itemId: modalData.payload.id,
            qtyChange: quantityDropped
        }));
    }

    const crossHandler = item => {
        dispatch(deleteItemFromMember({
            itemId: item.id,
            email: member.email,
        }));

        dispatch(changeRemainingQtyInReceiptItems({
            method: "INCREMENT",
            itemId: item.id,
            qtyChange: item.quantity,
        }));
    }

    return (
        <View>
            <View style={styles.contact}>
                <Image
                    source={{
                        uri: profileImg, 
                        cache: "only-if-cached"
                    }}
                    style={styles.profileImg}
                />
                <Text style={styles.emailText}>
                    {member.email}
                </Text>
            </View>
            <DraxView
                renderContent={() => (
                    <FlatList
                        keyExtractor={item => item.id}
                        style={styles.receivedItems}
                        data={member.items}
                        renderItem={({ item }) => (
                            <View style={styles.receivedItem}>
                                <Text>
                                    {item.quantity}x {item.description}
                                </Text>
                                <TouchableOpacity
                                    style={styles.crossBtn}
                                    onPress={() => crossHandler(item)}>
                                    <Entypo name="cross" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                        horizontal={true}
                    />
                )}
                onReceiveDragDrop={({ dragged: { payload } }) => {
                    if (payload.remainingQuantity === 1) {
                        setModalData({ isVisible: false, payload });
                        setIsAllDrop(true);
                    } else {
                        setModalData({ isVisible: true, payload });
                        setIsAllDrop(false);
                    }
                }}
            />
            {
                modalData.payload === null
                    ? null
                    : (
                        <ItemQuantityModal
                            isVisible={modalData.isVisible}
                            maxQuantity={modalData.payload.remainingQuantity}
                            receiveDragDropHandler={receiveDragDropHandler}
                            onClose={() => setModalData({ ...modalData, isVisible: false })}
                        />
                    )
            }
        </View>
    )
};

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    crossBtn: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    emailText: {
        fontSize: 18
    },
    profileImg: {
        width: 66,
        height: 66,
        borderRadius: 33,
        marginRight: 20,
        overflow: 'hidden'
    },
    receivedItem: {
        margin: 10,
        justifyContent: 'center',
        flex: 1,
        paddingRight: 20
    },
    receivedItems: {
        borderWidth: 1,
        height: 60,
        marginHorizontal: 10,
    }
})

export default ItemReceiver;