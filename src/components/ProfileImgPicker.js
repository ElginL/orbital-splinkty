import React, { useState, useEffect } from 'react';
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
    const [profileImg, setProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")

    const profilePictures = useSelector(state => state.users.profilePictures);

    useEffect(() => {
        setProfileImg(profilePictures[getCurrentUser()]);
    }, [profilePictures]);

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
                setProfileImg(result.uri);
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
                setProfileImg(result.uri);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const onDeletePress = async () => {
        await deleteProfileImg();
        
        setModalVisible(false);
        setProfileImg("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    }
    
    return (
        <View>
            <TouchableOpacity
                style={styles.photoFrame}
                onPress={() => setModalVisible(true)}>
                <Image
                    style={styles.profileImg} 
                    source={{ uri: profileImg }}
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