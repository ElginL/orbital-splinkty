import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, getCurrentUser } from '../firebase/loginAPI';
import { addUser } from '../store/usersSlice';
import { addFriendWithPayments, addFriendEmail } from '../store/friendsSlice';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const friendshipRef = collection(db, "friendship");
        
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

        return () => {
            unsubFriendshipQ();
            unsubAcceptedQ();
            unsubUserQ();
        }
    }, []);

    return (
        <View>
            <Text>Home Page!!!</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Home;