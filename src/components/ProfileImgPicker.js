import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {
    StyleSheet, 
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { uploadImg, deleteProfileImg } from '../firebase/ProfileImgAPI';
import { getCurrentUser } from '../firebase/loginAPI';
import ProfileImgPickerModal from './ProfileImgPickerModal';

const ProfileImgPicker = () => {
    const NO_PROFILE_IMG = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    const [photoURI, setPhotoURI] = useState(NO_PROFILE_IMG);
    const [visible, setVisible] = useState(false);
    
    const profilePictures = useSelector(state => state.users.profilePictures);
    
    useEffect(() => {
        if (profilePictures[getCurrentUser()]) {
            setPhotoURI(profilePictures[getCurrentUser()]);
        }
    }, [profilePictures]);

    const onImageLibraryPress = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
    
            if (!result.cancelled) {
                setPhotoURI(result.uri);
                
                await uploadImg(result.uri);
                setVisible(false);
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
                setPhotoURI(result.uri);
                
                await uploadImg(result.uri);
                setVisible(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const onDeletePress = async () => {
        await deleteProfileImg();
        
        setPhotoURI(NO_PROFILE_IMG);
        setVisible(false);
    }
    
    return (
        <View>
            <TouchableOpacity
                style={styles.photoFrame}
                onPress={() => setVisible(true)}>
                <Image
                    style={styles.profileImg} 
                    source={{ uri: photoURI }}
                />
            </TouchableOpacity>
            <ProfileImgPickerModal
                isVisible={visible}
                onClose={() => setVisible(false)}
                onImageLibraryPress={onImageLibraryPress}
                onCameraPress={onCameraPress}
                onDeletePress={onDeletePress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    photoFrame: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: 'black'
    },
    profileImg: {
        width: 200,
        height: 200,
        borderRadius: 100
    }
});

export default ProfileImgPicker;