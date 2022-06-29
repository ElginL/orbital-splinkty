import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ActiveGroupContact from '../components/ActiveGroupContact';
import ActiveGroupSearchBar from '../components/ActiveGroupSearchBar';
import HorizontalLine from '../components/HorizontalLine';
import SelectedFriend from '../components/SelectedFriend';

const ActiveGroup = ({ navigation }) => {
    const friendsEmail = useSelector(state => state.friendship.friendsEmail);
    const profileImgs = useSelector(state => state.users.profilePictures);
    const activeGroupMembers = useSelector(state => state.receipt.activeGroupMembers);
    
    const [filteredFriends, setFilteredFriends] = useState(friendsEmail);
    
    return (
        <View style={styles.container}>
            <ActiveGroupSearchBar
                friendsEmail={friendsEmail}
                setFilteredFriends={setFilteredFriends}
            />
            <HorizontalLine />
            <View style={styles.selectedPplContainer}>
                <FlatList
                    keyExtractor={item => item.email}
                    data={activeGroupMembers}
                    renderItem={({ item }) => (
                        <SelectedFriend 
                            member={item}
                            profileImg={profileImgs[item.email]}
                        />
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <HorizontalLine />
            </View>
            {
                friendsEmail.length === 0
                    ? (
                        <View style={styles.noFriendsContainer}>
                            <Text style={styles.noResultText}>
                                You do not have friends yet...
                            </Text>
                            <TouchableOpacity style={styles.navigateBtn}
                                onPress={() => navigation.navigate("SendFriendRequest")}>
                                <Text style={styles.navigateLink}>
                                    Click to Add Friends
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) 
                    : filteredFriends.length === 0
                        ? (
                            <Text style={styles.noResultText}>
                                No Search Results...
                            </Text>
                        )
                        : (
                            <FlatList
                                keyExtractor={item => item}
                                data={filteredFriends}
                                renderItem={({ item }) => (
                                    <ActiveGroupContact 
                                        email={item}
                                        profileImg={profileImgs[item]}
                                        activeGroupMembers={activeGroupMembers}
                                    />
                                )}
                            />
                        )
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    navigateLink: {
        color: 'rgb(10, 132, 255)',
        fontSize: 18,
        marginTop: 10,
        fontStyle: 'italic',
        fontWeight: '200'
    },
    noFriendsContainer: {
        alignItems: 'center'
    },
    noResultText: {
        marginTop: 50,
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: '200'
    }
})

export default ActiveGroup;