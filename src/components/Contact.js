import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Image
} from 'react-native';

const Contact = ({ item }) => {
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
                    if (item.amount === 0) {
                        return (
                            <View style={styles.paymentContainer}>
                                <Text style={styles.nudgeAmount}>$0</Text>
                            </View>
                        );
                    }

                    if (item.isOweFriend) {
                        return (
                            <View style={styles.paymentContainer}>
                                <Text style={styles.payAmount}>${item.amount}</Text>
                                <TouchableOpacity style={styles.payBtn}>
                                    <Text style={styles.payText}>Pay</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }

                    return (
                        <View style={styles.paymentContainer}>
                            <Text style={styles.nudgeAmount}>${item.amount}</Text>
                            <TouchableOpacity style={styles.nudgeBtn}>
                                <Text style={styles.nudgeText}>Nudge</Text>
                            </TouchableOpacity>
                        </View>
                    );
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
    nudgeBtn: {
        backgroundColor: 'green',
        width: 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    nudgeAmount: {
        color: 'green',
        fontSize: 18,
        marginBottom: 6
    },
    nudgeText: {
        color: 'white',
        textAlign: 'center'
    },
    payAmount: {
        color: 'red',
        fontSize: 20,
        marginBottom: 6
    },
    payBtn: {
        backgroundColor: 'orange',
        width: 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
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

export default Contact;