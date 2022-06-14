import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { 
    doc,
    deleteDoc,
} from 'firebase/firestore';
import { db, getCurrentUser } from '../firebase/loginAPI';
import { deleteFriendship } from '../store/friendsSlice';
import { FontAwesome5 } from '@expo/vector-icons';
import Contact from './Contact';
import DeleteFriendModal from './DeleteFriendModal';

const FriendsPayments = () => {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);

    const currentUser = getCurrentUser();
    const profilePictures = useSelector(state => state.users.profilePictures);

    let friends = useSelector(state => state.friendship.friendsWithPayments);

    friends = friends.map(obj => {
        const amount = obj.data.payments.payment;

        const friend = obj.data.otherUser === currentUser 
            ? obj.data.user 
            : obj.data.otherUser;
            
            const isOweFriend = (obj.data.payments.isOweOtherUser && friend == obj.data.otherUser) || 
                                (!obj.data.payments.isOweOtherUser && friend == obj.data.user);

        return {
            amount,
            friend,
            isOweFriend,
            friendProfilePicURL: profilePictures[friend],
            id: obj.id
        };
    });

    const deleteFriendHandler = async (id, friendEmail) => {
        try {
            dispatch(deleteFriendship({
                id,
                friendEmail
            }))

            const docRef = doc(db, 'friendship', id);
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Friends</Text>
            {
                friends.length === 0
                    ? <Text style={styles.emptyText}>No Friends Yet...</Text>
                    : (
                        <SwipeListView
                            keyExtractor={item => item.id}
                            listKey={item => item.id}
                            data={friends}
                            renderItem={({ item }) => (
                                <Contact item={item} />
                            )}
                            renderHiddenItem={({ item }) => (
                                <TouchableOpacity 
                                    style={styles.hiddenItem}
                                    onPress={() => setIsVisible(true)}>
                                    <FontAwesome5 
                                        name="trash-alt" 
                                        size={24} 
                                        color="red" 
                                    />
                                    <DeleteFriendModal
                                        isVisible={isVisible}
                                        deleteFriendHandler={() => deleteFriendHandler(item.id, item.friend)}
                                        onClose={() => setIsVisible(false)}
                                    />
                                </TouchableOpacity>
                            )}
                            rightOpenValue={-40}
                            disableRightSwipe
                            leftActivationValue={1}
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
    hiddenItem: {
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 15
    },
    sectionHeader: {
        fontSize: 33,
        margin: 20 
    },
});

export default FriendsPayments;