import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ItemModal from '../components/ItemModal';
import ScannedItem from '../components/ScannedItem';

const ScannedItems = ({ route, navigation }) => {
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const itemsDescription = route.params.itemsDescription;
        const prices = route.params.prices;
        const quantities = route.params.quantities;

        const tmp = [];
        for (let i = 0; i < itemsDescription.length; i++) {
            tmp.push({ 
                description: itemsDescription[i], 
                price: prices[i], 
                quantity: quantities[i],
                id: Math.random(1000)
            });
        }
    
        setItems(tmp);
    }, []);

    const addItemHandler = (description, quantity, price, itemId) => {
        setItems([ ...items, { description, quantity, price }]);
    };

    const editItemHandler = (description, quantity, price, itemId) => {
        const editedItems = items.map(item => {
            if (item.id === itemId) {
                return {
                    description,
                    quantity,
                    price
                }
            }

            return item;
        })

        setItems(editedItems);
    }

    const deleteItemHandler = itemId => {
        const index = items.findIndex(el => el.id === itemId);
        setItems([ ...items.slice(0, index), ...items.slice(index + 1)]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.summaryText}>Receipt Summary</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.addText}>Add Items</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                keyExtractor={item => item.description}
                data={items}
                renderItem={({ item }) => (
                    <ScannedItem
                        item={item}
                        editItemHandler={editItemHandler}
                        deleteItemHandler={deleteItemHandler}
                    />
                )}
            />
            <ItemModal
                title="Add Item"
                isVisible={modalVisible}
                initialDescription=""
                initialPrice=""
                initialQuantity=""
                itemId=""
                submitHandler={addItemHandler}
                deleteBtnIsEnabled={false}
                deleteItemHandler={null}
                onClose={() => setModalVisible(false)}
            />
        </View>
    )
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