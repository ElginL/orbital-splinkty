import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity 
} from 'react-native';

const Contact = ({ item }) => {
    return (
        <View style={styles.contact}>
        <Text>{item.friend}</Text>
            {
                (() => {
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
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    payAmount: {
        color: 'red',
        fontSize: 20,
        marginBottom: 6
    },
    nudgeAmount: {
        color: 'green',
        fontSize: 18,
        marginBottom: 6
    },
    payText: {
        color: 'blue',
        textAlign: 'center'
    },
    nudgeText: {
        color: 'white',
        textAlign: 'center'
    },
    paymentContainer: {
        alignItems: 'center'
    },
    payBtn: {
        backgroundColor: 'orange',
        width: 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    nudgeBtn: {
        backgroundColor: 'green',
        width: 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    }
});

export default Contact;