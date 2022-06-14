import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';
import Checkbox from 'expo-checkbox';
import { addActiveGroupMember, removeActiveGroupMember } from '../store/receiptSlice';

const ActiveGroupContact = ({ email, profileImg, contains }) => {
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (!contains) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    }, [contains]);

    const addMember = newMember => {
        dispatch(addActiveGroupMember({
            newMember
        }));
    };

    const removeMember = memberToRemove => {
        dispatch(removeActiveGroupMember({
            memberToRemove
        }));
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {
                if (!isChecked) {
                    setIsChecked(true);
                    addMember(email);
                } else {
                    setIsChecked(false);
                    removeMember(email);
                }
            }}>
            <View style={styles.contactContainer}>
                <Image 
                    source={{ uri: profileImg }}
                    style={styles.profileImg}
                />
                <Text style={styles.email}>
                    {email}
                </Text>
            </View>
            <Checkbox 
                style={styles.checkBox}
                value={isChecked}
                onValueChange={setIsChecked}
                color="rgb(10, 132, 255)"
            />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    email: {
        fontSize: 16
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    }
});

export default ActiveGroupContact;