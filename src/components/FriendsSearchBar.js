import React, { useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../firebase/loginAPI';
import { FontAwesome } from '@expo/vector-icons';
import HorizontalLine from './HorizontalLine';
import SearchResult from './SearchResult';

const FriendsSearchBar = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);

    const friendsEmail = useSelector(state => state.friendship.friendsEmail);
    const photoURLS = useSelector(state => state.users.profilePictures);

    const inReqs = useSelector(state => state.friendship.friendRequests);
    const incomingReqs = useMemo(() => inReqs.map(req => req.from), [inReqs]);

    const users = useSelector(state => state.users.users);
    const allUsers = useMemo(() => {
        return users.filter(user => !friendsEmail.includes(user.email) &&
            user.email !== getCurrentUser() &&
            !incomingReqs.includes(user.email));
    }, [users, friendsEmail, incomingReqs]);

    const outgoingReqs = useSelector(state => state.friendship.sentFriendRequests);

    const filterUsers = (inputText) => {
        return allUsers.filter(user => user.email.startsWith(inputText) && inputText !== "");
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <FontAwesome
                    name="search"
                    size={25}
                    color="black"
                    style={{ marginRight: 10}}
                />
                <TextInput
                    style={styles.searchText}
                    onChangeText={text => setFilteredUsers(filterUsers(text))}
                    placeholder="Search For Friends"
                />
            </View>
            <HorizontalLine />
            <FlatList
                keyExtractor={item => item.id}
                listKey={item => item.id}
                data={filteredUsers}
                renderItem={({ item }) => {
                    return (
                        <SearchResult
                            user={item} 
                            outgoingReqs={outgoingReqs}
                            profilePic={photoURLS[item.email]}
                    />)
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchBar: {
        backgroundColor: '#f0f2f5',
        borderRadius: 30,
        margin: 15,
        padding: 10,
        flexDirection: 'row'
    },
    searchText: {
        fontSize: 18,
        width: '100%'
    },
});

export default FriendsSearchBar;