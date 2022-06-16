import { 
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector } from 'react-redux';
import Contact from './Contact';
import DeleteFriendBin from './DeleteFriendBin';

const FriendsPayments = () => {
    const profileImgs = useSelector(state => state.users.profilePictures);
    const friends = useSelector(state => state.friendship.friendsWithPayments);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>
                Friends
            </Text>
            {
                friends.length === 0
                    ? <Text style={styles.emptyText}>No Friends Yet...</Text>
                    : (
                        <SwipeListView
                            keyExtractor={item => item.id}
                            data={friends}
                            renderItem={({ item }) => (
                                <Contact 
                                    item={item} 
                                    profileImg={profileImgs[item.friend]}
                                />
                            )}
                            renderHiddenItem={({ item }) => (
                                <DeleteFriendBin
                                    item={item}
                                />
                            )}
                            rightOpenValue={-40}
                            disableRightSwipe
                        />
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 30,
    },
    sectionHeader: {
        fontSize: 33,
        marginVertical: 10
    },
});

export default FriendsPayments;