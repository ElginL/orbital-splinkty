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

const SearchResult = ({ user, profilePic }) => {
    const outgoingReqs = useSelector(state => state.friendship.sentFriendRequests);

    const addFriendHandler = otherUser => {
        addDoc(collection(db, "friendrequests"), {
            from: getCurrentUser(),
            to: otherUser
        });
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
                    source={{ uri: profilePic }} 
                    style={styles.contactImg} />
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
    contactImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
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
    name: {
        fontSize: 17
    },
    addBtn: {
        backgroundColor: '#24a0ed',
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    addText: {
        color: 'white',
        fontSize: 18
    },
    pendingText: {
        backgroundColor: '#3083ba',
        paddingVertical: 5,
        paddingHorizontal: 9,
        fontSize: 18,
        color: 'white'
    }
});

export default SearchResult;