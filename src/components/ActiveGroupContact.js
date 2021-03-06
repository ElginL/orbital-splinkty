import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import Checkbox from 'expo-checkbox';
import { addActiveGroupMember, removeActiveGroupMember } from '../store/receiptSlice';

const ActiveGroupContact = ({ email, profileImg, activeGroupMembers }) => {
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const index = activeGroupMembers.findIndex(member => {
            return member.email === email;
        })

        if (index === -1) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    }, [activeGroupMembers]);

    const addMember = newMember => {
        dispatch(addActiveGroupMember({
            newMember: {
                email: newMember,
                items: [],
            }
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
                    addMember(email);
                } else {
                    removeMember(email);
                }
            }}>
            <View style={styles.contactContainer}>
                <Image
                    source={{ 
                        uri: profileImg,
                        cache: "only-if-cached"
                    }}
                    style={styles.profileImg}
                />
                <Text style={styles.email}>
                    {email}
                </Text>
            </View>
            <Checkbox 
                style={styles.checkBox}
                value={isChecked}
                color="rgb(10, 132, 255)"
                onValueChange={() => {
                    if (!isChecked) {
                        addMember(email);
                    } else {
                        removeMember(email);
                    }
                }}
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
        overflow: 'hidden',
        marginRight: 10
    }
});

export default ActiveGroupContact;