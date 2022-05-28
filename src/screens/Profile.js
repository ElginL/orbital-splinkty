import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { logOutUser } from '../firebase/loginAPI';
import LoadingOverlay from '../components/LoadingOverlay';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const logOutHandler = () => {
        setIsLoading(true);
        logOutUser()
            .then(() => {})
            .catch((error) => {
                alert(error);
            });
    };

    const renderLoading = () => {
        if (isLoading) {
            return <LoadingOverlay />;
        } else {
            return;
        }
    }

    return (
        <View>
            <Text>Profile Page</Text>
            <Button
                title="Log Out Button"
                onPress={logOutHandler}
            />
            {renderLoading()}
        </View>
    );
};

const styles = StyleSheet.create({});

export default Profile;