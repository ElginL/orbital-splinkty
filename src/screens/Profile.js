import { View, Text, StyleSheet, Button } from 'react-native';
import { logOutUser } from '../firebase/loginAPI';

const Profile = () => {
    const logOutHandler = () => {
        logOutUser();
    }

    return (
        <View>
            <Text>Profile Page</Text>
            <Button
                title="Log Out Button"
                onPress={logOutHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Profile;