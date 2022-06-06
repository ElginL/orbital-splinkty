import React, { useEffect } from 'react';
import {  
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
    onSnapshot, 
    query, 
    collection, 
    where 
} from 'firebase/firestore';
import { addFriendRequest, addSentFriendRequest } from '../store/friendsSlice';
import { getCurrentUser, db } from '../firebase/loginAPI';
import { ScrollView } from 'react-native-virtualized-view';
import FriendsPayments from '../components/FriendsPayments';
import FriendRequests from '../components/FriendRequests';

const Friends = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Storing the outgoing friend requests.
        const q = query(collection(db, "friendrequests"), where("from", '==', getCurrentUser()));
        const unsubQ = onSnapshot(q, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addSentFriendRequest({ 
                    request: { 
                        to: doc.data().to, 
                        id: doc.id 
                    } 
                }));
            });
        });

        // Storing the incoming friend requests.
        const incomingQuery = query(collection(db, "friendrequests"), where('to', '==', getCurrentUser()));
        const unsubIncomingQ = onSnapshot(incomingQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addFriendRequest({ 
                    request: { 
                        from: doc.data().from, 
                        id: doc.id 
                    }
                }));
            });
        });

        return () => {
            unsubQ();
            unsubIncomingQ();
        }
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.container}>
                <View>
                    <FriendRequests />
                    <FriendsPayments />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});

export default Friends;