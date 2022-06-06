import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { 
    collection, 
    onSnapshot, 
    query, 
    where,
    orderBy,
    limit
} from "firebase/firestore";
import { db, getCurrentUser } from '../firebase/loginAPI';
import { setData, addTopPayment, getTop3Payments, resetTop3Payments } from '../store/currUserSlice';
import { addUser, addProfilePicture } from '../store/usersSlice';
import { addFriendWithPayments, addFriendEmail } from '../store/friendsSlice';
import Greeting from '../components/Greeting'
import Top3Payments from '../components/Top3Payments';

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const friendshipRef = collection(db, "friendship");
        const usersRef = collection(db, "users");
        dispatch(resetTop3Payments());

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
                dispatch(getTop3Payments());
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
                dispatch(getTop3Payments());
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
                }))
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

        const currIsUserQuery = query(friendshipRef, 
            where("user", "==", getCurrentUser()), 
            where("payments.payment", ">", 0),
            orderBy("payments.payment", "desc"),
            limit(3));
        const unsubCurrIsUserQuery = onSnapshot(currIsUserQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addTopPayment({
                    friend: {
                        data: doc.data(),
                        id: doc.id 
                    }
                }));
            })
        })

        const currIsOtherQuery = query(friendshipRef, 
            where("otherUser", "==", getCurrentUser()), 
            where("payments.payment", ">", 0),
            orderBy("payments.payment", "desc"),
            limit(3));
        const unsubCurrIsOtherQuery = onSnapshot(currIsOtherQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addTopPayment({
                    friend: {
                        data: doc.data(),
                        id: doc.id 
                    }
                }));
            })
        })

        return () => {
            unsubFriendshipQ();
            unsubAcceptedQ();
            unsubUserQ();
            unsubInpayQ();
            unsubCurrIsUserQuery();
            unsubCurrIsOtherQuery();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.greetingView}>
                <Greeting />
            </View>
            <View style={styles.otherView}>
                <Top3Payments />
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
        flex: 0.8,
        alignSelf: "stretch"
    },

    lastView: {
        flex: 0.4
    }
});

export default Home;