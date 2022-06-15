import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList
} from 'react-native';
import HorizontalLine from './HorizontalLine';

const ContactBill = ({ email, receiptItems, profileImg }) => {
    const items = receiptItems.filter(item => item[email] !== 0);

    const calculateTotal = () => {
        let totalPrice = 0;

        for (const item of items) {
            totalPrice += item.price / item.totalQuantity * item[email];
        }

        return totalPrice.toFixed(2);
    }

    return (
        <View style={styles.container}>
            <View style={styles.contactContainer}>
                <Image
                    source={{ uri: profileImg }}
                    style={styles.profilePic}
                />
                <Text style={styles.emailText}>
                    {email}
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.ordersText}>
                        Orders:
                    </Text>
                    {
                        items.length === 0
                            ? <Text>No Orders...</Text>
                            : (
                                <FlatList
                                    keyExtractor={item => item.id}
                                    data={items}
                                    renderItem={({ item }) => (
                                        <Text>
                                            {item[email]}x {item.description}
                                        </Text>
                                    )}
                                />
                            )
                    }
                </View>
                <View style={styles.totalPriceContainer}>
                    <Text style={styles.totalPriceText}>
                        Total price:
                    </Text>
                    <Text style={styles.calculatedPrice}>
                        ${calculateTotal()}
                    </Text>
                </View>
            </View>
            <HorizontalLine />
        </View>
    )
}

const styles = StyleSheet.create({
    calculatedPrice: {
        fontSize: 16,
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
        marginRight: 20
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