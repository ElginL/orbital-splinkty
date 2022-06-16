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
import { 
    setIncomingFriendRequests, 
    setSentFriendRequests 
} from '../store/friendsSlice';
import { getCurrentUser, db } from '../firebase/loginAPI';
import { ScrollView } from 'react-native-virtualized-view';
import FriendsPayments from '../components/FriendsPayments';
import FriendRequests from '../components/FriendRequests';

const Friends = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Storing the outgoing friend requests.
        const outgoingRequestsQuery = query(collection(db, "friendrequests"), where("from", '==', getCurrentUser()));
        const unsubOutgoingRequestsQuery = onSnapshot(outgoingRequestsQuery, snapshot => {
            const sentRequests = [];

            snapshot.docs.forEach(doc => {
                sentRequests.push({
                    to: doc.data().to,
                    id: doc.id
                });
            });

            dispatch(setSentFriendRequests({
                sentRequests
            }));
        });

        // Storing the incoming friend requests.
        const incomingRequestsQuery = query(collection(db, "friendrequests"), where('to', '==', getCurrentUser()));
        const unsubIncomingRequestsQuery = onSnapshot(incomingRequestsQuery, snapshot => {
            const incomingRequests = [];

            snapshot.docs.forEach(doc => {
                incomingRequests.push({
                    from: doc.data().from,
                    id: doc.id
                })
            });

            dispatch(setIncomingFriendRequests({
                incomingRequests
            }))
        });

        return () => {
            unsubOutgoingRequestsQuery();
            unsubIncomingRequestsQuery();
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
        padding: 20
    }
});

export default Friends;