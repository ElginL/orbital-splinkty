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

    const [members, setMembers] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState(friendsEmail);

    const addMember = memberToAdd => {
        setMembers([ ...members, memberToAdd ]);
    }

    const removeMember = memberToRemove => {
        const indexToRemove = members.findIndex(member => member === memberToRemove);
        setMembers([ 
            ...members.slice(0, indexToRemove), 
            ...members.slice(indexToRemove + 1) 
        ]);
    }

    return (
        <View style={styles.container}>
            <ActiveGroupSearchBar
                friendsEmail={friendsEmail}
                setFilteredFriends={setFilteredFriends}
            />
            <HorizontalLine />
            <View style={styles.selectedPplContainer}>
                <FlatList
                    keyExtractor={item => item}
                    data={members}
                    renderItem={({ item }) => (
                        <SelectedFriend 
                            email={item}
                            profileImg={profileImgs[item]}
                            removeMember={removeMember}
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
                                    contains={members.includes(item)}
                                    addMember={addMember}
                                    removeMember={removeMember}
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