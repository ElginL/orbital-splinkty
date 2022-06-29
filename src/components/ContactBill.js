import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import HorizontalLine from './HorizontalLine';
import CachedImage from 'react-native-expo-cached-image';

const ContactBill = ({ member, profileImg }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contactContainer}>
                <CachedImage
                    isBackground
                    source={{ uri: profileImg }}
                    style={styles.profilePic}
                />
                <Text style={styles.emailText}>
                    {member.email}
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.ordersText}>
                        Orders:
                    </Text>
                    {
                        member.items.length === 0
                            ? <Text>No Orders...</Text>
                            : (
                                member.items.map(item => (
                                    <Text>
                                        {item.quantity}x {item.description}
                                    </Text>
                                ))
                            )
                    }
                </View>
                <View style={styles.totalPriceContainer}>
                    <Text style={styles.totalPriceText}>
                        Total price:
                    </Text>
                    <Text style={styles.calculatedPrice}>
                        ${member.totalPrice.toFixed(2)}
                    </Text>
                </View>
            </View>
            <HorizontalLine />
        </View>
    )
}

const styles = StyleSheet.create({
    calculatedPrice: {
        fontSize: 20,
        color: 'red'
    },
    container: {
        margin: 10,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    emailText: {
        fontSize: 18
    },
    ordersText: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginRight: 20,
        overflow: 'hidden'
    },
    totalPriceContainer: {
        alignItems: 'center'
    },
    totalPriceText: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold'
    }
});

export default ContactBill;