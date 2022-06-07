import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    Text,
    View,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../firebase/loginAPI';

const Greeting = () => {
    const cashToReceive = useSelector(state => state.currUser.cashToReceive);
    const cashToPay = useSelector(state => state.currUser.cashToPay);
    const pplToReceiveFromCount = useSelector(state => state.currUser.pplToReceiveFromCount);
    const pplToPayCount = useSelector(state => state.currUser.pplToPayCount);

    const profilePictures = useSelector(state => state.users.profilePictures);

    const [photoURI, setPhotoURI] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");

    useEffect(() => {
        if (profilePictures[getCurrentUser()]) {
            setPhotoURI(profilePictures[getCurrentUser()]);
        }
    }, [profilePictures]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImg} 
                source={{ uri: photoURI }} 
            />
            <Text style={styles.greetingTitle}>
                Welcome Back
            </Text>
            <Text style={styles.username}>
                {getCurrentUser()}
            </Text>
            <View style={styles.totalContainer}>
                <View style={styles.totalCard}>
                    <Text style={styles.paymentText}>
                        Total to pay:
                    </Text>
                    <Text style={styles.paymentAmount}>
                        ${cashToPay}
                    </Text>
                    {
                        pplToReceiveFromCount === 1
                            ? <Text style={styles.paymentText}>to {pplToPayCount} person</Text>
                            : <Text style={styles.paymentText}>to {pplToPayCount} people</Text>
                    }
                </View>
                <View style={styles.totalCard}>
                    <Text style={styles.receiveText}>
                        Total to receive:
                    </Text>
                    <Text style={styles.receiveAmount}>
                        ${cashToReceive}
                    </Text>
                    {
                        pplToPayCount === 1
                            ? <Text style={styles.receiveText}>from {pplToReceiveFromCount} person</Text>
                            : <Text style={styles.receiveText}>from {pplToReceiveFromCount} people</Text>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    greetingTitle: {
        fontSize: 18,
    },
    totalCard: {
        margin: 10,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        width: 175,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    totalContainer: {
        flexDirection: "row",
        marginVertical: 20,
    },
    paymentAmount: {
        color: "red",
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 5
    },
    paymentText: {
        textAlign: 'center'
    },
    receiveText: {
        textAlign: 'center'
    },
    profileImg: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignSelf: 'center',
        margin: 20
    },
    receiveAmount: {
        color: "green",
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 5
    },
    username: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10
    }
});

export default Greeting;