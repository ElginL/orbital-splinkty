import React, { useState } from 'react';
import {
    StyleSheet, 
    TouchableOpacity,
    Text,
    ScrollView,
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

const Profile = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const logOutHandler = () => {
        setIsLoading(true);        

        logOutUser();
    }

    return (
        <ScrollView style={styles.container}>
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
                <TouchableOpacity 
                    style={styles.historyBtn}
                    onPress={() => navigation.navigate("PaymentsHistory")}>
                    <Text style={styles.historyText}>
                        View Payment History
                    </Text>
                </TouchableOpacity>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    historyBtn: {
        marginVertical: 16,
        width: '100%'
    },
    historyText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(10, 132, 255)'
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