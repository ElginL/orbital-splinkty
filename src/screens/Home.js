import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, getCurrentUser } from '../firebase/loginAPI';
import { addUser } from '../store/usersSlice';
import { addFriendWithPayments, addFriendEmail, extractTop3Payments } from '../store/friendsSlice';
import { setData, getTotalIn } from '../store/currUserSlice';
import FriendsPayments from '../components/FriendsPayments';
import Greeting from '../components/Greeting';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const friendshipRef = collection(db, "friendship");
        const usersRef = collection(db, "users");
        
        /* Adds friends to store, for which the friendship is formed by the current logged in user's
           sent request */
        const q = query(friendshipRef, where('user', '==', getCurrentUser()));
        const unsubFriendshipQ = onSnapshot(q, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addFriendWithPayments({
                    friend: {
                        data: doc.data(),
                        id: doc.id
                    }
                }));
                dispatch(addFriendEmail({ 
                    friend: doc.data().otherUser 
                }));
                dispatch(extractTop3Payments());
            });
        });
        
        /* Adds friends to store, for which the friendship is formed by the logged
           in user accepting requests. */
        const acceptedQuery = query(friendshipRef, where('otherUser', "==", getCurrentUser()));
        const unsubAcceptedQ = onSnapshot(acceptedQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addFriendWithPayments({
                    friend: { 
                        data: doc.data(),
                        id: doc.id 
                    }
                }));
                dispatch(addFriendEmail({ 
                    friend: doc.data().user 
                }));
                dispatch(extractTop3Payments());
            });
        });
        
        // Listener for users, add to store if someone sign up for an account.
        const unsubUserQ = onSnapshot(collection(db, "users"), snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addUser({ 
                    user: { 
                        email: doc.data().email, 
                        id: doc.id 
                    } 
                }));
            });
        });

        // Listener for updates to current user's total in/out, update store
        const currUserQuery = query(usersRef, where("email", "==", getCurrentUser()));
        const unsubInpayQ = onSnapshot(currUserQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(setData({
                    email: doc.data().email,
                    totalin: doc.data().totals.in,
                    totalout: doc.data().totals.out,
                    peopleToReceive: doc.data().peopleToReceive,
                    peopleToPay: doc.data().peopleToPay
                }))
            })
        });

        /* Listener for updates to top 3 outgoing payments from user perspective
        const top3ToPayUserQuery = query(friendshipRef, 
            where("user", "==", getCurrentUser()), 
            where("payments.payment", ">", 0), 
            where("payments.isOweOtherUser", "==", true),
            orderBy("payments.payment", "desc"),
            limit(3));

        // Listener for updates to top 3 outgoing payments from other perspective
        const top3ToPayOtherQuery = query(friendshipRef, 
            where("otherUser", "==", getCurrentUser()), 
            where("payments.payment", ">", 0),
            where("payments.isOweOtherUser", "==", false),
            orderBy("payments.payment", "desc"),
            limit(3));
        */

        return () => {
            unsubFriendshipQ();
            unsubAcceptedQ();
            unsubUserQ();
            unsubInpayQ();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.greetingView}>
                <Greeting />
            </View>
            <View style={styles.otherView}>
                <Text>asdasd</Text>
            </View>
            <View style={styles.lastView}>
                <Text>Home Page!!!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

    greetingView: {
        flex: 0.2,
        alignSelf: "stretch",
    },

    otherView: {
        flex: 0.4,
        backgroundColor: 'green'
    },

    lastView: {
        flex: 0.4
    }
});

export default Home;