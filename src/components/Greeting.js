import {
    StyleSheet, 
    Text,
    View,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../firebase/loginAPI';

const Greeting = ({
    cashToReceive,
    cashToPay,
    pplToReceiveFromCount,
    pplToPayCount
}) => {
    const profilePictures = useSelector(state => state.users.profilePictures);

    const photoURI = profilePictures[getCurrentUser()];

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImg} 
                source={{ uri: photoURI }} 
                cache="only-if-cached"
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
                        ${cashToPay.toFixed(2)}
                    </Text>
                    {
                        pplToPayCount === 1
                            ? <Text style={styles.paymentText}>to {pplToPayCount} person</Text>
                            : <Text style={styles.paymentText}>to {pplToPayCount} people</Text>
                    }
                </View>
                <View style={styles.totalCard}>
                    <Text style={styles.receiveText}>
                        Total to receive:
                    </Text>
                    <Text style={styles.receiveAmount}>
                        ${cashToReceive.toFixed(2)}
                    </Text>
                    {
                        pplToReceiveFromCount === 1
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
        alignItems: 'center',
    },
    greetingTitle: {
        fontSize: 18,
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
    profileImg: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 5,
        overflow: 'hidden'
    },
    receiveText: {
        textAlign: 'center'
    },
    receiveAmount: {
        color: "green",
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 5
    },
    totalCard: {
        margin: 10,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        width: '48%',
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
        marginVertical: 10,
    },
    username: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});

export default Greeting;