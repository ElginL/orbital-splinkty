import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import SplitBillMethodsModal from './SplitBillMethodsModal';
// import { uploadScannedImage, processImage, deleteScannedImage } from '../firebase/ScannedImgAPI';

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

        const result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            // await uploadScannedImage(result.uri);
            // const details = await processImage();

            setModalVisible(false);
            navigation.navigate("Scanned Items", {
                // itemsDescription: details[1],
                // prices: details[2],
                // quantities: details[0]
                itemsDescription: ["Chicken Nuggets", "McSpicy", "Filet O' Fish", "Fries", "Tomyum Noodles"],
                prices: [7.20, 7.70, 5.80, 3.90, 2.40],
                quantities: [6, 1, 2, 1, 2]
            });

            // await deleteScannedImage();
        }
    }

    const pickImageHandler = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            // await uploadScannedImage(result.uri);
            // const details = await processImage();

            setModalVisible(false);
            navigation.navigate("Scanned Items", {
                // itemsDescription: details[1],
                // prices: details[2],
                // quantities: details[0]
                itemsDescription: ["Chicken Nuggets", "McSpicy", "Filet O' Fish", "Fries", "Tomyum Noodles"],
                prices: [7.20, 7.70, 5.80, 3.90, 2.40],
                quantities: [6, 1, 2, 1, 2]
            });

            // await deleteScannedImage();
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
        right: 30,
    },
})

export default CreateSplitRequestBtn;