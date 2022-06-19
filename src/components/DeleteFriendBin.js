import React, { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { 
    doc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/loginAPI';
import DeleteFriendModal from './DeleteFriendModal';

const DeleteFriendBin = ({ item }) => {
    const [isVisible, setIsVisible] = useState(false);

    const deleteFriendHandler = async (id) => {
        try {
            const docRef = doc(db, 'friendship', id);
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
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
    )
};

const styles = StyleSheet.create({
    hiddenItem: {
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 15
    },
})

export default DeleteFriendBin;