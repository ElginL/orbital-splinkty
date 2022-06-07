import React, { useEffect } from 'react';
import { 
    View,
    StyleSheet 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { 
    collection,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { db, getCurrentUser } from '../firebase/loginAPI';
import { setData } from '../store/currUserSlice';
import { addUser, addProfilePicture } from '../store/usersSlice';
import { addFriendWithPayments, addFriendEmail } from '../store/friendsSlice';
import { addTopPayment } from '../store/currUserSlice';
import Greeting from '../components/Greeting';
import Top3Payments from '../components/Top3Payments';

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
                dispatch(addTopPayment({
                    friend: {
                        data: doc.data(),
                        id: doc.id 
                    }
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
                dispatch(addTopPayment({
                    friend: {
                        data: doc.data(),
                        id: doc.id 
                    }
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
                dispatch(addProfilePicture({
                    userEmail: doc.data().email,
                    url: doc.data().photoURL
                }));
            });
        });

        // Listener for updates to current user's total in/out, update store
        const currUserQuery = query(usersRef, where("email", "==", getCurrentUser()));
        const unsubCurrUserQ = onSnapshot(currUserQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(setData({
                    cashToReceive: doc.data().total.receiving,
                    cashToPay: doc.data().total.paying,
                    pplToReceiveFromCount: doc.data().peopleToReceive,
                    pplToPayCount: doc.data().peopleToPay
                }));
            })
        });

        return () => {
            unsubFriendshipQ();
            unsubAcceptedQ();
            unsubUserQ();
            unsubCurrUserQ();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Greeting />
            <Top3Payments />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
});

export default Home;