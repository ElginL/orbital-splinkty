import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList,
    StyleSheet
} from 'react-native';
import {
    onSnapshot, 
    query, 
    collection, 
    where,
    addDoc,
    deleteDoc,
    doc 
} from 'firebase/firestore';
import { 
    setIncomingFriendRequests, 
} from '../store/friendsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db, getCurrentUser } from '../firebase/loginAPI';
import FriendRequest from '../components/FriendRequest';

const FriendRequests = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const incomingRequestsQuery = query(collection(db, "friendrequests"), where('to', '==', getCurrentUser()));
        const unsubIncomingRequestsQuery = onSnapshot(incomingRequestsQuery, snapshot => {
            const incomingRequests = [];

            snapshot.docs.forEach(doc => {
                incomingRequests.push({
                    from: doc.data().from,
                    id: doc.id
                });
            });

            dispatch(setIncomingFriendRequests({
                incomingRequests
            }));
        });

        return () => {
            unsubIncomingRequestsQuery();
        }
    }, []);

    const incomingFriendRequests = useSelector(state => state.friendship.friendRequests);
    const profilePictures = useSelector(state => state.users.profilePictures);

    const declineHandler = async (id) => {
        try {
            const docRef = doc(db, 'friendrequests', id);
            await deleteDoc(docRef);
        } catch (err) {
            console.log(err);
        }
    }

    const acceptHandler = async (user, id) => {
        await declineHandler(id);

        await addDoc(collection(db, "friendship"), {
            connection: [ user, getCurrentUser() ],
            isOweIndex1: true,
            paymentAmount: 0
        });
    }

    return (
        <View style={styles.container}>
            {
                incomingFriendRequests.length === 0
                    ? (
                        <Text style={styles.emptyText}>
                            No incoming friend requests...
                        </Text>
                    )
                    : (
                        <FlatList
                            keyExtractor={item => item.id}
                            data={incomingFriendRequests}
                            renderItem={({ item }) => (
                                <FriendRequest
                                    item={item}
                                    declineHandler={declineHandler}
                                    acceptHandler={acceptHandler}
                                    url={profilePictures[item.from]}
                                />
                            )}
                        />
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 200,
    },
});

export default FriendRequests;