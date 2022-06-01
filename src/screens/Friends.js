import React from 'react';
import {  
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import FriendsSearchBar from '../components/FriendsSearchBar';
import FriendsPayments from '../components/FriendsPayments';
import FriendRequests from '../components/FriendRequests';

const Friends = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style={styles.container}>
                    <FriendsSearchBar />
                    <FriendRequests />
                    <FriendsPayments />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Friends;