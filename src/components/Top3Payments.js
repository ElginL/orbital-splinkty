import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    TouchableOpacity,
    Text,
    SafeAreaView,
    View,
    Image
} from 'react-native';
import { db, getCurrentUser } from '../firebase/loginAPI';
import { useDispatch, useSelector } from 'react-redux';
import ContactSimple from './ContactSimple';
import { getTop3Payments } from '../store/currUserSlice';
import { SwipeListView } from 'react-native-swipe-list-view';

const Top3Payments = () => {
    const dispatch = useDispatch();
    const currentUser = getCurrentUser();
    const currTop3Payments = useSelector((state) => state.currUser.top3Payments);
    const profilePictures = useSelector(state => state.users.profilePictures);

    const currTop3PaymentsCopy = currTop3Payments.map(obj => {
        const amount = obj.data.payments.payment;

        const friend = obj.data.otherUser === currentUser 
            ? obj.data.user 
            : obj.data.otherUser;
            
        const isOweFriend = (obj.data.payments.isOweOtherUser && friend == obj.data.otherUser) || 
                            (!obj.data.payments.isOweOtherUser && friend == obj.data.user);
        
        return {
            amount,
            friend,
            isOweFriend,
            friendProfilePicURL: profilePictures[friend],
            id: obj.id
        };
    });

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Top Outstanding Payments</Text>
            {
                currTop3Payments.length === 0
                    ? <Text style={styles.emptyText}>No Outstanding Payments!</Text>
                    : (
                        <SwipeListView
                            keyExtractor={item => item.id}
                            listKey={item => item.id}
                            data={currTop3PaymentsCopy}
                            renderItem={({ item }) => (
                                <ContactSimple item={item} />
                            )}
                        />
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        flex: 1
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 30,
    },
    sectionHeader: {
        fontSize: 30,
        margin: 10,
        flexShrink: 1
    }
});

export default Top3Payments;