import React from 'react';
import { 
    View,
    Text, 
    StyleSheet, 
    TouchableOpacity,
} from 'react-native';
import { getCurrentUser, db } from '../firebase/loginAPI';
import HorizontalLine from './HorizontalLine';
import { AntDesign } from '@expo/vector-icons';
import { addDoc, collection } from 'firebase/firestore';

const SearchResult = ({ user, incomingReqs, outgoingReqs }) => {
    const addFriendHandler = (otherUser) => {
        addDoc(collection(db, "friendrequests"), {
            from: getCurrentUser(),
            to: otherUser
        });
    }

    return (
        <View>
            <HorizontalLine />
            <View style={styles.resultContainer}>
                <Text style={styles.singleSearchResult}>
                    {user.email}
                </Text>
                {
                    (() => {
                        if (!incomingReqs.includes(user.email) && !outgoingReqs.includes(user.email)) {
                            return (
                                <TouchableOpacity
                                    onPress={() => addFriendHandler(user.email) }>
                                    <AntDesign name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            )
                        }
                        return <Text>Pending</Text>
                    })()
                } 
            </View> 
            <HorizontalLine />
        </View>
    )
};

const styles = StyleSheet.create({
    singleSearchResult: {
        padding: 10,
    },
    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    }
});

export default SearchResult;