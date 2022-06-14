import { 
    StyleSheet, 
    View, 
    Text,
    Image
} from 'react-native';

const ContactSimple = ({ item }) => {
    if (item.amount === 0) {
        return null;
    }

    return (
        <View style={styles.contact}>
            <View style={styles.userDisplay}>
                <Image
                    source={{ uri: item.friendProfilePicURL }} 
                    style={styles.contactImg} />
                <Text style={styles.name}>{item.friend}</Text>
            </View>
            {
                (() => {
                    if (item.isOweFriend) {
                        return (
                            <View style={styles.paymentContainer}>
                                <Text style={styles.payMessage}>To Pay</Text>
                                <Text style={styles.payAmount}>${item.amount}</Text>
                            </View>
                        );
                    }
            
                    return (
                        <View style={styles.paymentContainer}>
                            <Text style={styles.nudgeMessage}>To Receive</Text>
                            <Text style={styles.nudgeAmount}>${item.amount}</Text>
                        </View>
                    )
                })()
            }
        </View>
    );
};

const styles = StyleSheet.create({
    contact: {
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contactImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    name: {
        fontSize: 17
    },
    nudgeAmount: {
        color: 'green',
        fontSize: 20,
    },
    payAmount: {
        color: 'red',
        fontSize: 20,
    },
    nudgeMessage: {
        color: 'green',
        fontSize: 10
    },
    payMessage: {
        color: 'red',
        fontSize: 10
    },
    paymentContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        width: 60
    },
    payText: {
        color: 'blue',
        textAlign: 'center'
    },
    userDisplay: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default ContactSimple;