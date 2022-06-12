import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import Modal from 'react-native-modal';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const ReceiptOptions = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        if (isFocused) {
            setModalVisible(true);
        }
    }, [isFocused]);

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You need to give camera access in order to use this feature");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            // allowsEditing: true,
        });

        if (!result.cancelled) {
            // TODO: Send this uri to a program that returns back the scanned items.
            console.log(result.uri);
            setModalVisible(false);
            navigation.navigate("Scanned Items", {
                itemsDescription: ["Chicken Nuggets", "McSpicy", "Filet O' Fish", "Fries", "Tomyum Noodles"],
                prices: [7.20, 7.70, 5.80, 3.90, 2.40],
                quantities: [6, 1, 2, 1, 2]
            });
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true
        });

        if (!result.cancelled) {
            // TODO: Send this uri to a program that returns back the scanned items.
            console.log(result.uri);
            setModalVisible(false);
            navigation.navigate("Scanned Items", {
                itemsDescription: ["Chicken Nuggets", "McSpicy", "Filet O' Fish", "Fries", "Tomyum Noodles"],
                prices: [7.20, 7.70, 5.80, 3.90, 2.40],
                quantities: [6, 1, 2, 1, 2]
            });
        }
    };

    return (
        <Modal 
            isVisible={modalVisible} 
            style={styles.modal}
            onBackdropPress={() => { setModalVisible(false); navigation.navigate("Home") }}>
            <View style={styles.btnsContainer}>
                <Text style={styles.containerTitle}>Options</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={pickImage}>
                    <Text style={styles.btnText}>
                        Pick Receipt From Gallery
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={openCamera}>
                    <Text style={styles.btnText}>
                        Take Picture Of Receipt
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ReceiptOptions;

const styles = StyleSheet.create({
    btn: {
        padding: 5,
        backgroundColor: '#24a0ed',
        width: '80%',
        margin: 10 
    },
    btnsContainer: {
        width: '80%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18,
        textAlign: 'center'
    },
    containerTitle: {
        fontSize: 25,
        marginBottom: 10
    },
    modal: {
        alignItems: 'center'
    }
})