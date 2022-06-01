import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { logOutUser } from '../firebase/loginAPI';
import { useDispatch } from 'react-redux';
import { resetUsers } from '../store/usersSlice';
import { resetFriends } from '../store/friendsSlice';
import LoadingOverlay from '../components/LoadingOverlay';

const Profile = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const logOutHandler = () => {
        dispatch(resetFriends());
        dispatch(resetUsers());

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