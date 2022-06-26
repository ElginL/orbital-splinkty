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
    setReceiptItems
} from '../store/receiptSlice';
import AddItemModal from '../components/AddItemModal';
import ScannedItem from '../components/ScannedItem';

const ScannedItems = ({ route }) => {
    const dispatch = useDispatch();

    const items = useSelector(state => state.receipt.receiptItems);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const itemsDescription = route.params.itemsDescription;
        const prices = route.params.prices;
        const quantities = route.params.quantities;

        const initialItems = [];
        for (let i = 0; i < itemsDescription.length; i++) {
            initialItems.push({
                description: itemsDescription[i],
                price: prices[i],
                remainingQuantity: quantities[i],
                initialQuantity: quantities[i],
                id: Math.random(1000)
            })
        }

        dispatch(setReceiptItems({
            receiptItems: initialItems
        }));
    }, []);

    const addItemHandler = (description, quantity, price) => {
        if (!isValidFormInput(description, quantity, price)) {
            return false;
        }

        dispatch(addReceiptItem({
            newItem: {
                description,
                price: parseFloat(price),
                remainingQuantity: parseInt(quantity),
                initialQuantity: parseInt(quantity),
                id: Math.random(1000),
            }
        }));

        return true;
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
            {
                items.length === 0
                    ? <Text style = {styles.noText}>
                        No Scanned Items Found {'\n'} 
                        Try taking a nicer image of receipt or add manually
                    </Text>
                    : <FlatList
                        keyExtractor={item => item.id}
                        data={items}
                        renderItem={({ item }) => (
                            <ScannedItem
                                item={item}
                                isValidFormInput={isValidFormInput}
                            />
                        )}
                    />

            }
            <AddItemModal
                isVisible={modalVisible}
                addHandler={addItemHandler}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    addText: {
        color: 'rgb(10, 132, 255)',
        fontSize: 18
    },
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    noText: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '400',
        marginTop: 250
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    summaryText: {
        fontSize: 18
    }
});

export default ScannedItems;