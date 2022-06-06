import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    TouchableOpacity,
    Text,
    SafeAreaView,
    View,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { getUserProfilePicture, getCurrentUser } from '../firebase/loginAPI';

const Greeting = () => {
    const currentUser = getCurrentUser();
    const currIn = useSelector((state) => state.currUser.totalin);
    const currOut = useSelector((state) => state.currUser.totalout);
    const peopleToReceive = useSelector((state) => state.currUser.peoplein);
    const peopleToPay = useSelector((state) => state.currUser.peopleout)
    const NO_PROFILE_IMG = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const profilePictures = useSelector((state) => state.users.profilePictures);
    const [photoURI, setPhotoURI] = useState(NO_PROFILE_IMG);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (profilePictures[getCurrentUser()]) {
            setPhotoURI(profilePictures[getCurrentUser()]);
        }
    }, [profilePictures]);

    const renderIncoming = () => {
        if (peopleToReceive == 1) {
            return <Text style={styles.greetingMessageIncoming}>
                Total incoming payments: ${currIn} to {peopleToReceive} person</Text>;
        }
        return <Text style={styles.greetingMessageIncoming}>
            Total incoming payments: ${currIn} to {peopleToReceive} people</Text>;
    }

    const renderOutgoing = () => {
        if (peopleToPay == 1) {
            return <Text style={styles.greetingMessageOutgoing}>
                Total outgoing payments: ${currOut} to {peopleToPay} person</Text>;
        }
        return <Text style={styles.greetingMessageOutgoing}>
            Total outgoing payments: ${currOut} to {peopleToPay} people</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileImgContainer}>
                <Image
                    style={styles.profileImg} 
                    source={{ uri: photoURI }} />
            </View>
            <View style={styles.greetingMessageContainer}>
                <Text style={styles.greetingTitle}>Hello, {currentUser}.</Text>
                {renderOutgoing()}
                {renderIncoming()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'transparent'
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 100,
        top: 5,
        left: 5
    },
    profileImgContainer: {
        justifyContent: "center"
    },
    greetingTitle: {
        flexShrink: 1,
        fontSize: 18
    },
    greetingMessageIncoming: {
        flexShrink: 1,
        fontSize: 14,
        color: "green"
    },
    greetingMessageOutgoing: {
        flexShrink: 1,
        fontSize: 14,
        color: "red"
    },
    greetingMessageContainer: {
        flexShrink: 1,
        justifyContent: "center",
        paddingLeft: 20
    }
});

export default Greeting;