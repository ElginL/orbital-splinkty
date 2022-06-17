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

const ItemQuantityModal = ({
    isVisible,
    maxQuantity,
    receiveDragDropHandler,
    onClose
}) => {
    const [ quantity, setQuantity ] = useState(maxQuantity);
    const [ hasError, setHasError ] = useState(false)

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => {
                setHasError(false);
                onClose();
            }}
            style={styles.modal}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.quantityText}>
                        Quantity
                    </Text>
                    <TextInput
                        keyboardType='number-pad'
                        onChangeText={text => setQuantity(parseInt(text))}
                        style={styles.quantityInput}
                        placeholder={`Max Quantity: ${maxQuantity}`}
                        placeholderTextColor='grey'
                    />
                    {
                        hasError
                            ? (
                                <View>
                                    <Text style={styles.errorMessage}>Invalid Quantity*</Text>
                                    <Text style={styles.errorMessage}>{`Must be in between 1 and ${maxQuantity}`}</Text>
                                </View>
                            )
                            : null
                    }
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setHasError(false);
                                onClose();
                            }}>
                            <Text style={styles.cancelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (quantity > maxQuantity || quantity <= 0) {
                                    setHasError(true);
                                    return;
                                }

                                receiveDragDropHandler(quantity);
                                setHasError(false);
                                onClose();
                            }}>
                            <Text style={styles.confirmText}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        margin: 20
    },
    cancelText: {
        color: 'red',
        fontSize: 18
    },
    confirmText: {
        color: 'blue',
        fontSize: 18
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '70%',
        height: '23%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    quantityInput: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        width: '80%'
    },
    quantityText: {
        fontSize: 24,
        marginVertical: 10
    }
});

export default ItemQuantityModal;