import { View, Text, StyleSheet, Button } from 'react-native';
import { logOutUser } from '../firebase/loginAPI';
import { useDispatch } from 'react-redux';
import { resetUsers } from '../store/usersSlice';
import { resetFriends } from '../store/friendsSlice';

const Profile = () => {
    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(resetFriends());
        dispatch(resetUsers());
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