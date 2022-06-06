import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Image
} from 'react-native';

const ContactSimple = ({ item }) => {
    
    const renderOwedAmount = () => {
        if (item.amount === 0) {
            return;
        }

        else if (item.isOweFriend) {
            return (
                <View style={styles.paymentContainer}>
                    <Text style={styles.payAmount}>${item.amount}</Text>
                </View>
            );
        }

        return (
            <View style={styles.paymentContainer}>
                <Text style={styles.nudgeAmount}>${item.amount}</Text>
            </View>
        );
    }

    return (
        <View style={styles.contact}>
            <View style={styles.userDisplay}>
                <Image 
                    source={{ uri: item.friendProfilePicURL }} 
                    style={styles.contactImg} />
                <Text style={styles.name}>{item.friend}</Text>
            </View>
            {renderOwedAmount()}
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
    paymentContainer: {
        alignItems: 'center'
    },
    payText: {
        color: 'blue',
        textAlign: 'center'
    },
    userDisplay: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default ContactSimple;