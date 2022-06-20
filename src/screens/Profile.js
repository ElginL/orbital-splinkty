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
import HorizontalLine from '../components/HorizontalLine';
import NotificationSettings from '../components/NotificationSettings';
import ProfileImgPicker from '../components/ProfileImgPicker';
import LoadingOverlay from '../components/LoadingOverlay';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const logOutHandler = () => {
        setIsLoading(true);

        try {
            logOutUser();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userProfile}>
                <ProfileImgPicker />
                <Text style={styles.userText}>
                    {getCurrentUser()}
                </Text>
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
            {
                isLoading
                    ? <LoadingOverlay />
                    : null
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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