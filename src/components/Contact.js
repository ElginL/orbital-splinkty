import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Image
} from 'react-native';

const Contact = ({ item, profileImg }) => {
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
                    if (item.amount === 0) {
                        return (
                            <Text style={styles.zeroAmount}>
                                $0
                            </Text>
                        );
                    }

                    if (item.isOweFriend) {
                        return (
                            <View style={styles.paymentContainer}>
                                <Text style={styles.payAmount}>
                                    ${item.amount.toFixed(2)}
                                </Text>
                                <TouchableOpacity style={styles.payBtn}>
                                    <Text style={styles.payText}>
                                        Pay
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }

                    return (
                        <View style={styles.paymentContainer}>
                            <Text style={styles.nudgeAmount}>
                                ${item.amount.toFixed(2)}
                            </Text>
                            <TouchableOpacity style={styles.nudgeBtn}>
                                <Text style={styles.nudgeText}>
                                    Nudge
                                </Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 5,
        padding: 10
    },
    contactImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
    },
    name: {
        fontSize: 18
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
        alignItems: 'center',
        width: 80
    },
    payText: {
        color: 'blue',
        textAlign: 'center'
    },
    userDisplay: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    zeroAmount: {
        color: 'green',
        fontSize: 25,
        width: 80,
        textAlign: 'center'
    }
});

export default Contact;