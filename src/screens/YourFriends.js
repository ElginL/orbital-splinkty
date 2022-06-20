import { 
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
import DeleteFriendBin from '../components/DeleteFriendBin';

const YourFriends = () => {
    const profileImgs = useSelector(state => state.users.profilePictures);
    const friends = useSelector(state => state.friendship.friendsWithPayments);

    return (
        <View style={styles.container}>
            {
                friends.length === 0
                    ? (
                        <Text style={styles.emptyText}>
                            No Friends Yet... {'\n'}
                            Press Magnifying Glass to search for friends
                        </Text>
                    )
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
        flex: 1,
        backgroundColor: 'white',
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 200,
    },
    sectionHeader: {
        fontSize: 33,
        marginVertical: 10
    },
});

export default YourFriends;