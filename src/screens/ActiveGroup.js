import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import ActiveGroupContact from '../components/ActiveGroupContact';
import ActiveGroupSearchBar from '../components/ActiveGroupSearchBar';
import SelectedFriend from '../components/SelectedFriend';
import HorizontalLine from '../components/HorizontalLine';

const ActiveGroup = () => {
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
                filteredFriends.length === 0
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
    noResultText: {
        marginTop: 50,
        fontSize: 18,
        textAlign: 'center'
    }
})

export default ActiveGroup;