import React, { useState } from 'react';
import {
    StyleSheet, 
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { 
    uploadImg,
    deleteProfileImg 
} from '../firebase/ProfileImgAPI';
import { getCurrentUser } from '../firebase/loginAPI';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileImgPickerModal from './ProfileImgPickerModal';

const ProfileImgPicker = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const profilePictures = useSelector(state => state.users.profilePictures);

    const onImageLibraryPress = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
    
            if (!result.cancelled) {
                await uploadImg(result.uri);
                setModalVisible(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const onCameraPress = async () => {
        try {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("You need to grant access to Camera in order to use this feature.");
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
    
            if (!result.cancelled) {
                await uploadImg(result.uri);
                setModalVisible(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const onDeletePress = async () => {
        await deleteProfileImg();
        
        setModalVisible(false);
    }
    
    return (
        <View>
            <TouchableOpacity
                style={styles.photoFrame}
                onPress={() => setModalVisible(true)}>
                <Image
                    style={styles.profileImg} 
                    source={{ uri: profilePictures[getCurrentUser()] }}
                    cache="only-if-cached"
                />
                <View style={styles.pencilContainer}>
                    <MaterialIcons 
                        name="edit" 
                        size={30} 
                        color="green"
                    />
                </View>
            </TouchableOpacity>
            <ProfileImgPickerModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onImageLibraryPress={onImageLibraryPress}
                onCameraPress={onCameraPress}
                onDeletePress={onDeletePress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pencilContainer: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        position: 'absolute',
        bottom: 10,
        right: 5
    },
    photoFrame: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    profileImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden'
    }
});

export default ProfileImgPicker;