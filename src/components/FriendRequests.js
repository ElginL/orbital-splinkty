import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList 
} from 'react-native';
import { 
    collection, 
    deleteDoc, 
    addDoc, 
    doc 
} from 'firebase/firestore';
import FriendRequest from './FriendRequest';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFriendRequest } from '../store/friendsSlice';
import { db, getCurrentUser } from '../firebase/loginAPI';

const FriendRequests = () => {
    const dispatch = useDispatch();

    const incomingFriendRequests = useSelector(state => state.friendship.friendRequests);

    const declineHandler = async (id) => {
        dispatch(deleteFriendRequest({ id }));
        
        try {
            const docRef = doc(db, 'friendrequests', id);
            await deleteDoc(docRef);
        } catch (err) {
            console.log(err);
        }
    }

    const acceptHandler = async (user, id) => {
        await declineHandler(id);

        addDoc(collection(db, "friendship"), {
            otherUser: getCurrentUser(),
            payments: {
                otherToUser: 0,
                userToOther: 0,
            },
            user,
            id
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subheader}>Friend Requests</Text>
            {
                (() => {
                    if (incomingFriendRequests.length === 0) {
                        return (
                            <Text style={styles.emptyText}>
                                No incoming friend requests...
                            </Text>
                        );
                    }

                    return (
                        <FlatList
                            keyExtractor={item => item.id}
                            listKey={item => item.id}
                            data={incomingFriendRequests}
                            renderItem={({ item }) => (
                                <FriendRequest 
                                    item={item}
                                    declineHandler={declineHandler}
                                    acceptHandler={acceptHandler}
                                />
                            )}
                        />
                    )
                })()
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 30,
        zIndex: 9
    },
    subheader: {
        fontSize: 33
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 30,
    },
});

export default FriendRequests;