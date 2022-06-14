import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList
} from 'react-native';
import { useDispatch } from 'react-redux';
import { DraxView } from 'react-native-drax';
import { editReceiptItemMemberQty } from '../store/receiptSlice';
import ItemQuantityModal from './ItemQuantityModal';

const ItemReceiver = ({ email, profileImg, receivedItems }) => {
    const dispatch = useDispatch();

    const [modalData, setModalData] = useState({ isVisible: false, payload: null });

    const receiveDragDropHandler = (id, quantityDropped) => {
        dispatch(editReceiptItemMemberQty({
            id,
            member: email,
            quantityDropped
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
                    {email}
                </Text>
            </View>
            <DraxView
                renderContent={() => (
                    <FlatList
                        keyExtractor={item => item.id}
                        style={styles.receivedItems}
                        data={receivedItems}
                        renderItem={({ item }) => (
                            <View style={styles.receivedItem}>
                                <Text>
                                    {item[email]}x {item.description}
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
                            itemId={modalData.payload.id}
                            maxQuantity={modalData.payload.quantity}
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