import Modal from 'react-native-modal';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import HorizontalLine from './HorizontalLine';

const SplitDetailsModal = ({ isVisible, onClose, item, isIncoming }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}>
            <View style={styles.detailsContainer}>
                {
                    isIncoming 
                        ? (
                            <View>
                                <Text style={styles.title}>
                                    Split Request From {'\n'} {item.from}
                                </Text>
                                <Text style={styles.yourOrdersText}>
                                    Your Orders:
                                </Text>
                            </View>
                        )
                        : (
                            <View>
                                <Text style={styles.title}>
                                    Split Request To {'\n'} {item.to}
                                </Text>
                                <Text style={styles.yourOrdersText}>
                                    His / Her Orders
                                </Text>
                            </View>
                        )
                }
                <FlatList
                    keyExtractor={item => Math.random(1000)}
                    data={item.items}
                    renderItem={({ item }) => (
                        <View 
                            style={styles.orderContainer}
                            key={Math.random(1000)}>
                            <Text style={styles.orderText}>{item.quantity}x {item.description}</Text>
                            <Text style={styles.priceText}>${item.priceShare}</Text>
                        </View>
                        
                    )}
                />
                <HorizontalLine />
                <Text style={styles.totalPrice}>
                    Total: ${item.totalPrice}
                </Text>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 40
    },
    orderContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between'
    },
    orderText: {
        fontSize: 17
    },
    priceText: {
        color: 'red',
        fontSize: 18
    },
    totalPrice: {
        color: 'red',
        fontSize: 18,
        marginVertical: 15
    },
    yourOrdersText: {
        fontSize: 20,
        marginBottom: 10
    }
});

export default SplitDetailsModal;