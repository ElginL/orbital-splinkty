import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ItemModal from './ItemModal';

const ScannedItem = ({ item, editItemHandler, deleteItemHandler }) => {
    const description = item.description;
    const price = item.price;
    const quantity = item.quantity;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.quantityContainer}>
                <View style={styles.quantityBox}>
                    <Text style={styles.quantity}>
                        {quantity}x
                    </Text>
                </View>
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.description}>
                    {description}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.editBtn}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.price}>{price}</Text>
            <ItemModal
                title="Edit Item"
                isVisible={modalVisible}
                initialDescription={description}
                initialPrice={price}
                initialQuantity={quantity}
                itemId={item.id}
                submitHandler={editItemHandler}
                deleteBtnIsEnabled={true}
                deleteItemHandler={deleteItemHandler}
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
        flex: 0.1,
        fontSize: 18,
        fontWeight: "300"
    }
});

export default ScannedItem;