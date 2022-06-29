import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
    editReceiptItem, 
    deleteReceiptItem,
} from '../store/receiptSlice';
import EditItemModal from './EditItemModal';

const ScannedItem = ({ item, isValidFormInput }) => {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const editItemHandler = (description, quantity, price, itemId) => {
        if (!isValidFormInput(description, quantity, price)) {
            return false;
        }

        dispatch(editReceiptItem({
            newDescription: description,
            newPrice: parseFloat(parseFloat(price).toFixed(2)),
            newQuantity: parseInt(quantity),
            id: itemId,
        }));

        return true;
    };

    const deleteItemHandler = itemId => {
        dispatch(deleteReceiptItem({
            id: itemId
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.quantityContainer}>
                <View style={styles.quantityBox}>
                    <Text style={styles.quantity}>
                        {item.initialQuantity}x
                    </Text>
                </View>
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.description}>
                    {item.description}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.editBtn}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.price}>
                {item.price.toFixed(2)}
            </Text>
            <EditItemModal
                isVisible={modalVisible}
                item={item}
                editHandler={editItemHandler}
                deleteHandler={deleteItemHandler}
                onClose={() => setModalVisible(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    centerContainer: {
        flex: 0.7
    },
    description: {
        fontWeight: 'bold',
        fontSize: 16
    },
    editBtn: {
        color: 'rgb(10, 132, 255)'
    },
    quantityBox: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
    },
    quantityContainer: {
        flex: 0.2,
        alignItems: 'center',
    },
    quantity: {
        color: 'rgb(10, 132, 255)',
        fontSize: 16,
    },
    price: {
        flex: 0.2,
        fontSize: 18,
        fontWeight: "300",
        textAlign: 'center',
    }
});

export default ScannedItem;