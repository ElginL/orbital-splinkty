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

const EditItemModal = ({
    isVisible,
    item,
    editHandler,
    deleteHandler,
    onClose
}) => {
    const [ description, setDescription ] = useState(item.description);
    const [ quantity, setQuantity ] = useState(item.initialQuantity);
    const [ price, setPrice ] = useState(item.price);

    const [ hasError, setHasError ] = useState(false);

    console.log(price);

    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            style={styles.modal}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            onPress={() => {
                                setHasError(false);
                                onClose();
                            }}
                            style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.addTitle}>Edit Item</Text>
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
                        <Text style={hasError ? styles.error : styles.warning}>
                            *All Fields Must Be Filled
                        </Text>
                        <Text style={hasError? styles.error : styles.warning}>
                            *Price Must Only Have At Most One Decimal
                        </Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity 
                                onPress={() => {
                                    deleteHandler(item.id)
                                    onClose();
                                }}>
                                <Text style={styles.deleteText}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.editBtn}
                                onPress={() => {
                                    if (editHandler(description, quantity, price, item.id)) {
                                        setHasError(false);
                                        onClose();
                                        return;
                                    }

                                    setHasError(true);
                                }}>
                                <Text style={styles.editBtnText}>
                                    Edit
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
    editBtn: {
        alignSelf: 'center'
    },
    editBtnText: {
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
    warning: {
        color: 'orange'
    },
    error: {
        color: 'red'
    }
});

export default EditItemModal;