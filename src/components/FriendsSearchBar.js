import React, { useState, useEffect, useMemo } from 'react';
import { 
    View,
    StyleSheet, 
    TextInput,
    FlatList,
} from 'react-native';
import {
    onSnapshot, 
    query, 
    collection, 
    where 
} from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, db } from '../firebase/loginAPI';
import { addFriendRequest, addSentFriendRequest } from '../store/friendsSlice';
import SearchResult from './SearchResult';

const FriendsSearchBar = () => {
    const dispatch = useDispatch();
    const [filteredUsers, setFilteredUsers] = useState([]);

    const friendsEmail = useSelector(state => state.friendship.friendsEmail);

    const users = useSelector(state => state.users.users);
    const allUsers = useMemo(() => {
        return users.filter(user => !friendsEmail.includes(user.email) &&
            user.email !== getCurrentUser())
    }, [users, friendsEmail, inReqs, outReqs]);

    const inReqs = useSelector(state => state.friendship.friendRequests);
    const incomingReqs = useMemo(() => inReqs.map(req => req.from), [inReqs]);

    const outReqs = useSelector(state => state.friendship.sentFriendRequests);
    const outgoingReqs = useMemo(() => outReqs.map(req => req.to), [outReqs]);

    const filterUsers = (inputText) => {
        return allUsers.filter(user => user.email.startsWith(inputText) && inputText !== "");
    }

    useEffect(() => {
        // Storing the outgoing friend requests.
        const q = query(collection(db, "friendrequests"), where("from", '==', getCurrentUser()));
        const unsubQ = onSnapshot(q, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addSentFriendRequest({ 
                    request: { 
                        to: doc.data().to, 
                        id: doc.id 
                    } 
                }));
            });
        });

        // Storing the incoming friend requests.
        const incomingQuery = query(collection(db, "friendrequests"), where('to', '==', getCurrentUser()));
        const unsubIncomingQ = onSnapshot(incomingQuery, snapshot => {
            snapshot.docs.forEach(doc => {
                dispatch(addFriendRequest({ 
                    request: { 
                        from: doc.data().from, 
                        id: doc.id 
                    }
                }));
            });
        });

        return () => {
            unsubQ();
            unsubIncomingQ();
        }
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                onChangeText={text => setFilteredUsers(filterUsers(text))}
                placeholder="Search For Friends"
            />
            <View style={styles.searchResults}>
                <FlatList
                    keyExtractor={item => item.id}
                    listKey={item => item.id}
                    data={filteredUsers}
                    renderItem={({ item }) => {
                        return (
                            <SearchResult
                                user={item} 
                                outgoingReqs={outgoingReqs}
                                incomingReqs={incomingReqs} 
                        />)
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        zIndex: 10
    },
    searchBar: {
        backgroundColor: 'white',
        shadowColor: 'rgba(100, 100, 111, 0.2)',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 20,
        shadowRadius: 10,
        width: '85%',
        marginTop: 30,
        padding: 10
    },
    searchResults: {
        width: '85%',
        position: 'absolute',
        top: 60,
        backgroundColor: 'white'
    },
});

export default FriendsSearchBar;