import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { DraxView } from 'react-native-drax';
import ItemQuantityModal from './ItemQuantityModal';
import { editActiveGroupMember, editReceiptItem } from '../store/receiptSlice';

const ItemReceiver = ({ member, profileImg }) => {
    const dispatch = useDispatch();

    const [modalData, setModalData] = useState({ isVisible: false, payload: null });

    const receiveDragDropHandler = quantityDropped => {
        const priceShare = modalData.payload.price / modalData.payload.initialQuantity * quantityDropped;
        dispatch(editActiveGroupMember({
            memberToEdit: member.email,
            newItem: {
                description: modalData.payload.description,
                quantity: quantityDropped,
                priceShare: parseFloat(priceShare.toFixed(2)),
                id: modalData.payload.id
            }
        }));

        dispatch(editReceiptItem({
            description: modalData.payload.description,
            price: modalData.payload.price,
            remainingQuantity: modalData.payload.remainingQuantity - quantityDropped,
            initialQuantity: modalData.payload.initialQuantity,
            id: modalData.payload.id,
        }))
    }

    return (
        <View>
            <View style={styles.contact}>
                <Image
                    source={{ uri: profileImg }}
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
                            </View>
                        )}
                        horizontal={true}
                    />
                )}
                onReceiveDragDrop={({ dragged: { payload } }) => {
                    setModalData({ isVisible: true, payload });
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
    emailText: {
        fontSize: 18
    },
    profileImg: {
        width: 66,
        height: 66,
        borderRadius: 33,
        marginRight: 20
    },
    receivedItem: {
        margin: 10,
        justifyContent: 'center',
        flex: 1
    },
    receivedItems: {
        borderWidth: 1,
        height: 60,
        marginHorizontal: 10,
    }
})

export default ItemReceiver;