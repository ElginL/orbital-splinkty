import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import SplitBillMethodsModal from './SplitBillMethodsModal';

const CreateSplitRequestBtn = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const addManuallyHandler = () => {
        navigation.navigate("Scanned Items", {
            itemsDescription: [],
            prices: [],
            quantities: []
        });
    }

    const openCameraHandler = async () => {
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

    const pickImageHandler = async () => {
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
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <AntDesign 
                    name="plus" 
                    size={24} 
                    color="black" 
                />
            </TouchableOpacity>
            <SplitBillMethodsModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                addManuallyHandler={addManuallyHandler}
                openCameraHandler={openCameraHandler}
                pickImageHandler={pickImageHandler}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
    },
})

export default CreateSplitRequestBtn;