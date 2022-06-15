import React, { useState, useEffect } from 'react';
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
import { addUser, addProfilePicture } from '../store/usersSlice';
import { addFriendWithPayments, addFriendEmail } from '../store/friendsSlice';
import Greeting from '../components/Greeting';
import Top3Payments from '../components/Top3Payments';

const Home = () => {
    const dispatch = useDispatch();
    
    const [cashToReceive, setCashToReceive] = useState(0);
    const [cashToPay, setCashToPay] = useState(0);
    const [pplToReceiveFromCount, setPplToReceiveFromCount] = useState(0);
    const [pplToPayCount, setPplToPayCount] = useState(0);

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
        
        // Listener for users, add to store if someone signs up for an account.
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

        // Listener for updates to current user's total in/out.
        const currUserQuery = query(usersRef, where("email", "==", getCurrentUser()));
        const unsubCurrUserQ = onSnapshot(currUserQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                setCashToReceive(doc.data().total.receiving);
                setCashToPay(doc.data().total.paying);
                setPplToReceiveFromCount(doc.data().peopleToReceive);
                setPplToPayCount(doc.data().peopleToPay);
            });
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
            <Greeting 
                cashToReceive={cashToReceive}
                cashToPay={cashToPay}
                pplToReceiveFromCount={pplToReceiveFromCount}
                pplToPayCount={pplToPayCount}
            />
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