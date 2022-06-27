import { 
    StyleSheet, 
    View, 
    Text,
} from 'react-native';
import CachedImage from 'react-native-expo-cached-image';

const ContactSimple = ({ item, profileImg }) => {
    return (
        <View style={styles.contact}>
            <View style={styles.userDisplay}>
                <CachedImage
                    isBackground
                    source={{ uri: profileImg }} 
                    style={styles.contactImg} />
                <Text style={styles.name}>
                    {item.friend}
                </Text>
            </View>
            {
                item.isOweFriend
                    ? (
                        <View style={styles.paymentContainer}>
                            <Text style={styles.payMessage}>To Pay</Text>
                            <Text style={styles.payAmount}>${item.amount.toFixed(2)}</Text>
                        </View>
                    )
                    : (
                        <View style={styles.paymentContainer}>
                            <Text style={styles.receiveMessage}>To Receive</Text>
                            <Text style={styles.receiveAmount}>${item.amount.toFixed(2)}</Text>
                        </View>
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    contactImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        overflow: 'hidden'
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