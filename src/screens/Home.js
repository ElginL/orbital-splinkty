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
import { setUsers, setProfilePictures } from '../store/usersSlice';
import { setFriendsWithPayments, setFriendsEmail } from '../store/friendsSlice';
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

        const friendsQuery = query(friendshipRef, where('connection', 'array-contains', getCurrentUser()));
        const unsubFriendshipQuery = onSnapshot(friendsQuery, snapshot => {
            const friendsWithPayments = [];
            const friendsEmail = [];

            snapshot.docs.forEach(doc => {
                const friendArrayIndex = doc.data().connection[0] === getCurrentUser()
                    ? 1
                    : 0;

                const isOweFriend = friendArrayIndex === 1
                    ? doc.data().isOweIndex1
                    : !doc.data().isOweIndex1;

                friendsWithPayments.push({
                    amount: doc.data().paymentAmount,
                    friend: doc.data().connection[friendArrayIndex],
                    isOweFriend,
                    id: doc.id
                });

                friendsEmail.push(doc.data().connection[friendArrayIndex]);
            }); 

            dispatch(setFriendsWithPayments({
                friendsWithPayments
            }));

            dispatch(setFriendsEmail({
                friendsEmail
            }));
        });
        
        const unsubUserQuery = onSnapshot(usersRef, snapshot => {
            const usersEmail = [];
            const profilePictures = {};

            snapshot.docs.forEach(doc => {
                usersEmail.push({
                    email: doc.data().email,
                    id: doc.id
                });
                profilePictures[doc.data().email] = doc.data().photoURL;
            });
            
            dispatch(setUsers({
                usersEmail
            }));

            dispatch(setProfilePictures({
                profilePictures
            }))
        });

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
            unsubFriendshipQuery();
            unsubUserQuery();
            unsubCurrUserQ();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Greeting 
                    cashToReceive={cashToReceive}
                    cashToPay={cashToPay}
                    pplToReceiveFromCount={pplToReceiveFromCount}
                    pplToPayCount={pplToPayCount}
                />
                <Top3Payments />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
});

export default Home;