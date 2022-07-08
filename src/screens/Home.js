import React, { useState, useEffect } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { 
    collection,
    onSnapshot,
    query,
    doc,
    updateDoc,
    where
} from "firebase/firestore";
import { db, getCurrentUser } from '../firebase/loginAPI';
import { 
    setUsers, 
    addUserPic,
    addUserNotifToken,
} from '../store/usersSlice';
import { setFriendsWithPayments, setFriendsEmail } from '../store/friendsSlice';
import { getToken } from '../firebase/notifications';
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
                    nudgeTime: doc.data().nudgeTime ? doc.data().nudgeTime : 0,
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

            snapshot.docs.forEach(doc => {
                usersEmail.push({
                    email: doc.data().email,
                    id: doc.id
                });
                
                dispatch(addUserPic({
                    email: doc.data().email,
                    profilePic: doc.data().photoURL
                }));

                doc.data().notificationOn
                    ? dispatch(addUserNotifToken({ email: doc.data().email, token: doc.data().notifToken }))
                    : dispatch(addUserNotifToken({ email: doc.data().email, token: null }));
            });

            dispatch(setUsers({
                usersEmail
            }));
        });

        const currUserQuery = query(usersRef, where("email", "==", getCurrentUser()));
        const unsubCurrUserQ = onSnapshot(currUserQuery, snapshot => {
            snapshot.docs.forEach(async document => {
                setCashToReceive(document.data().total.receiving);
                setCashToPay(document.data().total.paying);
                setPplToReceiveFromCount(document.data().peopleToReceive);
                setPplToPayCount(document.data().peopleToPay);

                const userRef = doc(db, "users", document.id);
                const token = await getToken();
                if (token && document.data().notificationOn) {
                    await updateDoc(userRef, {
                        notifToken: token
                    });
                }
            });
        });

        return () => {
            unsubFriendshipQuery();
            unsubUserQuery();
            unsubCurrUserQ();
        }
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View>
                <Greeting 
                    cashToReceive={cashToReceive}
                    cashToPay={cashToPay}
                    pplToReceiveFromCount={pplToReceiveFromCount}
                    pplToPayCount={pplToPayCount}
                />
                <Top3Payments />
            </View>
        </ScrollView>
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