import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector } from 'react-redux';
import { 
    doc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/loginAPI';
import { FontAwesome5 } from '@expo/vector-icons';
import Contact from './Contact';
import DeleteFriendModal from './DeleteFriendModal';

const FriendsPayments = () => {
    const [isVisible, setIsVisible] = useState(false);

    const profileImgs = useSelector(state => state.users.profilePictures);
    const friends = useSelector(state => state.friendship.friendsWithPayments);

    const deleteFriendHandler = async (id) => {
        try {
            const docRef = doc(db, 'friendship', id);
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error.message);
        }
    };

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
                            listKey={item => item.id}
                            data={friends}
                            renderItem={({ item }) => (
                                <Contact 
                                    item={item} 
                                    profileImg={profileImgs[item.friend]}
                                />
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
                                        deleteFriendHandler={() => deleteFriendHandler(item.id)}
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
    },
    sectionHeader: {
        fontSize: 33,
        marginVertical: 10
    },
});

export default FriendsPayments;