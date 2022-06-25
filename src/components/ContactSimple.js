import { 
    StyleSheet, 
    View, 
    Text,
    Image
} from 'react-native';

const ContactSimple = ({ item, profileImg }) => {
    return (
        <View style={styles.contact}>
            <View style={styles.userDisplay}>
                <Image
                    source={{ uri: profileImg, cache: 'only-if-cached' }} 
                    style={styles.contactImg} />
                <Text style={styles.name}>
                    {item.friend}
                </Text>
            </View>
            {
                (() => {
                    if (item.isOweFriend) {
                        return (
                            <View style={styles.paymentContainer}>
                                <Text style={styles.payMessage}>To Pay</Text>
                                <Text style={styles.payAmount}>${item.amount.toFixed(2)}</Text>
                            </View>
                        );
                    }
            
                    return (
                        <View style={styles.paymentContainer}>
                            <Text style={styles.receiveMessage}>To Receive</Text>
                            <Text style={styles.receiveAmount}>${item.amount.toFixed(2)}</Text>
                        </View>
                    )
                })()
            }
        </View>
    );
};

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
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
    payAmount: {
        color: 'red',
        fontSize: 20,
    },
    payMessage: {
        color: 'red',
        fontSize: 10
    },
    paymentContainer: {
        alignItems: 'center'
    },
    receiveAmount: {
        color: 'green',
        fontSize: 20,
    },
    receiveMessage: {
        color: 'green',
        fontSize: 10
    },
    userDisplay: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default ContactSimple;