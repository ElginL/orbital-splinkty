import React, { useState } from 'react';
import {
    StyleSheet, 
    TouchableOpacity,
    Text,
    SafeAreaView,
    View
} from 'react-native';
import {
    logOutUser,
    getCurrentUser
} from '../firebase/loginAPI';
import { useDispatch } from 'react-redux';
import { resetUsers } from '../store/usersSlice';
import { resetFriends } from '../store/friendsSlice';
import { resetCurrentUser } from '../store/currUserSlice';
import LoadingOverlay from '../components/LoadingOverlay';
import ProfileImgPicker from '../components/ProfileImgPicker';
import NotificationSettings from '../components/NotificationSettings';
import HorizontalLine from '../components/HorizontalLine';

const Profile = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const logOutHandler = () => {
        dispatch(resetFriends());
        dispatch(resetUsers());
        dispatch(resetCurrentUser());

        setIsLoading(true);
        logOutUser()
            .then(() => {})
            .catch((error) => {
                alert(error);
            });
    }

    const renderLoading = () => {
        if (isLoading) {
            return <LoadingOverlay />;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userProfile}>
                <ProfileImgPicker />
                <Text style={styles.userText}>{getCurrentUser()}</Text>
            </View>
            <View style={styles.settings}>
                <Text style={styles.settingsText}>Settings</Text>
                <HorizontalLine />
                <NotificationSettings />
            </View>
            <TouchableOpacity
                onPress={logOutHandler}
                style={styles.logOutBtn}>
                <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>
            {renderLoading()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logOutBtn: {
        marginTop: '25%'
    },
    logOutText: {
        color: 'rgb(10, 132, 255)',
        fontSize: 20,
        textAlign: 'center'
    },
    photoFrame: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black'
    },
    settingsText: {
        fontSize: 30
    },
    settings: {
        margin: 30
    },
    userProfile: {
        alignItems: 'center',
        margin: 30
    },
    userText: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold'
    },
});

export default Profile;