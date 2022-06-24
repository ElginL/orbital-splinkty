import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import SplitBillMethodsModal from './SplitBillMethodsModal';
import getData from '../firebase/ReceiptProcessing';
import LoadingOverlay from './LoadingOverlay';

const CreateSplitRequestBtn = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [base64, setBase64] = useState("");

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            setIsLoading(false);
        }
    }, [isFocused]);

    useEffect(() => {
        if (isLoading) {
            const fetchData = async () => {
                const data = await getData(base64);
                return data;
            }

            fetchData()
                .then(receiptDetails => {
                    navigation.navigate("Scanned Items", {
                        quantities: receiptDetails[0],
                        itemsDescription: receiptDetails[1],
                        prices: receiptDetails[2]
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [isLoading]);

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
            base64: true
        });

        if (!result.cancelled) {
            setModalVisible(false);
            setBase64(result.base64);
            setTimeout(() => {
                setIsLoading(true);
            }, 500)
        }
    }

    const pickImageHandler = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true
        });
        
        if (!result.cancelled) {
            setModalVisible(false);
            setBase64(result.base64);
            setTimeout(() => {
                setIsLoading(true);
            }, 500)
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
            {
                isLoading
                    ? <LoadingOverlay />
                    : null
            }
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