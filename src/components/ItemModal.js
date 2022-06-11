import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

const ItemModal = ({
    title,
    isVisible,
    initialDescription,
    initialPrice,
    initialQuantity,
    itemId,
    submitHandler,
    deleteBtnIsEnabled,
    deleteItemHandler,
    onClose
}) => {
    const [ description, setDescription ] = useState(initialDescription);
    const [ quantity, setQuantity ] = useState(initialQuantity);
    const [ price, setPrice ] = useState(initialPrice);

    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            style={styles.modal}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.addTitle}>{title}</Text>
                    </View>
                    <View style={styles.mainBody}>
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>
                                Item Description
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setDescription(text)}
                                value={description}
                                placeholder="e.g. Nuggets"
                            />
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>
                                Quantity
                            </Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="number-pad"
                                onChangeText={quantity => setQuantity(quantity)}
                                value={quantity.toString()}
                                placeholder="e.g. 1"
                            />
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>
                                Price
                            </Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="decimal-pad"
                                onChangeText={price => setPrice(price)}
                                value={price.toString()}
                                placeholder="e.g. 7.22"
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            {
                                !deleteBtnIsEnabled
                                    ? null
                                    : (
                                        <TouchableOpacity 
                                            onPress={() => {
                                                deleteItemHandler(itemId)
                                                onClose();
                                            }}>
                                            <Text style={styles.deleteText}>
                                                Delete
                                            </Text>
                                        </TouchableOpacity>
                                    )
                            }
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={() => {
                                    submitHandler(description, quantity, price, itemId);
                                    setDescription("");
                                    setQuantity("");
                                    setPrice("");
                                    onClose();
                                }}>
                                <Text style={styles.addBtnText}>
                                    {title}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const styles = StyleSheet.create({
    addBtn: {
        alignSelf: 'center'
    },
    addBtnText: {
        color: 'rgb(10, 132, 255)',
        fontSize: 22,
    },
    addTitle: {
        position: 'absolute',
        width: '100%',
        left: '45%',
        fontSize: 20
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cancelText: {
        fontSize: 18,
        color: 'rgb(10, 132, 255)',
    },
    deleteText: {
        color: 'red',
        fontSize: 22
    },
    formSection: {
        marginVertical: 10
    },
    input: {
        borderWidth: 1,
        padding: 10
    },
    mainBody: {
        marginTop: 50,
        paddingHorizontal: 10
    },
    modal: {
        backgroundColor: 'white',
        margin: 0,
        marginTop: '15%',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 5
    },
    topBar: {
        flexDirection: 'row',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'lightgrey',
        alignItems: 'center'
    },
});

export default ItemModal;