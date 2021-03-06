import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { 
    addDoc,
    collection,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { getCurrentUser, db } from '../firebase/loginAPI';
import { sendPushNotification } from '../firebase/notifications';

const SearchResult = ({ user, profilePic }) => {
    const outgoingReqs = useSelector(state => state.friendship.sentFriendRequests);
    const notifTokens = useSelector(state => state.users.notificationTokens);

    const addFriendHandler = async otherUser => {
        await addDoc(collection(db, "friendrequests"), {
            from: getCurrentUser(),
            to: otherUser
        });

        await sendPushNotification(
            notifTokens[otherUser],
            `${getCurrentUser()} sent you a friend request!`,
            "Accept or Decline it!"
        )
    }

    const cancelHandler = async () => {
        let id = "";
        for (const request of outgoingReqs) {
            if (request.to === user.email) {
                id = request.id;
                break;
            }
        }

        const docRef = doc(db, "friendrequests", id);
        try {
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error.message);
        }
    }

    const outgoingReqsContains = (email) => {
        for (const request of outgoingReqs) {
            if (request.to === email) {
                return true;
            }
        }
        return false;
    }

    return (
        <View style={styles.searchResult}>
            <View style={styles.userDisplay}>
                <Image
                    source={{ 
                        uri: profilePic, 
                        cache: "only-if-cached" 
                    }} 
                    style={styles.contactImg} 
                />
                <Text style={styles.name}>{user.email}</Text>
            </View>
            {
                (() => {
                    if (!outgoingReqsContains(user.email)) {
                        return (
                            <TouchableOpacity
                                onPress={() => addFriendHandler(user.email) }
                                style={styles.addBtn}>
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                        );
                    }
                    return (
                        <TouchableOpacity
                            onPress={cancelHandler}
                        >
                            <Text style={styles.pendingText}>Cancel</Text>
                        </TouchableOpacity>
                    );
                })()
            }
        </View>
    )
};

const styles = StyleSheet.create({
    addBtn: {
        backgroundColor: '#24a0ed',
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    addText: {
        color: 'white',
        fontSize: 18
    },
    contactImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        overflow: 'hidden'
    },
    name: {
        fontSize: 17
    },
    pendingText: {
        backgroundColor: '#3083ba',
        paddingVertical: 5,
        paddingHorizontal: 9,
        fontSize: 18,
        color: 'white'
    },
    searchResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    userDisplay: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default SearchResult;