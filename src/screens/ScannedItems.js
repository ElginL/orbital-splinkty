import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    addReceiptItem, 
    editReceiptItem, 
    deleteReceiptItem,
    emptyReceiptItems 
} from '../store/receiptSlice';
import AddItemModal from '../components/AddItemModal';
import ScannedItem from '../components/ScannedItem';

const ScannedItems = ({ route }) => {
    const dispatch = useDispatch();

    const items = useSelector(state => state.receipt.receiptItems);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(emptyReceiptItems());

        const itemsDescription = route.params.itemsDescription;
        const prices = route.params.prices;
        const quantities = route.params.quantities;

        for (let i = 0; i < itemsDescription.length; i++) {
            dispatch(addReceiptItem({
                newItem: {
                    description: itemsDescription[i], 
                    price: prices[i], 
                    quantity: quantities[i],
                    id: Math.random(1000)
                }
            }))
        }
    }, []);

    const addItemHandler = (description, quantity, price) => {
        if (!isValidFormInput(description, quantity, price)) {
            return false;
        }

        dispatch(addReceiptItem({
            newItem: {
                description,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                id: Math.random(1000)
            }
        }));

        return true;
    };

    const editItemHandler = (description, quantity, price, itemId) => {
        if (!isValidFormInput(description, quantity, price)) {
            return false;
        }

        dispatch(editReceiptItem({
            description,
            quantity,
            price,
            id: itemId
        }));

        return true;
    };

    const deleteItemHandler = itemId => {
        dispatch(deleteReceiptItem({
            id: itemId
        }));
    };

    const isValidFormInput = (description, quantity, price) => {
        if (description === "" || quantity === "" || price === "") {
            return false;
        }

        let dotCount = 0;
        for (let i = 0; i < price.length; i++) {
            if (price.charAt(i) === ".") {
                dotCount++;
            }
        }

        return dotCount <= 1;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.summaryText}>Receipt Summary</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.addText}>Add Items</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                keyExtractor={item => Math.random(1000)}
                data={items}
                renderItem={({ item }) => (
                    <ScannedItem
                        item={item}
                        editItemHandler={editItemHandler}
                        deleteItemHandler={deleteItemHandler}
                    />
                )}
            />
            <AddItemModal
                isVisible={modalVisible}
                addHandler={addItemHandler}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    addText: {
        color: 'rgb(10, 132, 255)',
        fontSize: 18
    },
    summaryText: {
        fontSize: 18
    }
});

export default ScannedItems;