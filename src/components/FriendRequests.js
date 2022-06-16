import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList 
} from 'react-native';
import { useSelector } from 'react-redux';
import { 
    addDoc,
    collection, 
    deleteDoc, 
    doc
} from 'firebase/firestore';
import { db, getCurrentUser } from '../firebase/loginAPI';
import FriendRequest from './FriendRequest';

const FriendRequests = () => {
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
            <Text style={styles.subheader}>Friend Requests</Text>
            {
                incomingFriendRequests.length === 0
                    ? <Text style={styles.emptyText}>No incoming friend requests...</Text>
                    : (
                        <FlatList
                            keyExtractor={item => item.id}
                            listKey={item => item.id}
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
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 30,
    },
    subheader: {
        fontSize: 33,
        marginVertical: 10
    },
});

export default FriendRequests;