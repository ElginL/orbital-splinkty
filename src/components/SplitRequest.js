import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import HorizontalLine from './HorizontalLine';
import SplitDetailsModal from './SplitDetailsModal';

const SplitRequest = ({ item }) => {
    const profileImgs = useSelector(state => state.users.profilePictures);

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.requesterContainer}>
                    <Image
                        source={{ uri: profileImgs[item.from] }}
                        style={styles.requesterImg}
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.requesterText}>
                            {item.from}
                        </Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.acceptBtn}>
                                <Text style={styles.acceptText}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.declineBtn}>
                                <Text style={styles.declineText}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.splitAmountContainer}>
                    <Text style={styles.shareText}>Split Price</Text>
                    <Text style={styles.priceShare}>${item.totalPrice}</Text>
                    <TouchableOpacity onPress={() => setDetailsModalVisible(true)}>
                        <Text style={styles.detailsBtnText}>
                            Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SplitDetailsModal 
                isVisible={detailsModalVisible}
                onClose={() => setDetailsModalVisible(false)}
                item={item}
            />
            <HorizontalLine />
        </View>
    );
};

const styles = StyleSheet.create({
    acceptBtn: {
        backgroundColor: 'rgb(10, 132, 255)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 15
    },
    acceptText: {
        color: 'white',
        fontSize: 18,
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 18,
        alignItems: 'center'
    },
    declineBtn: {
        backgroundColor: 'lightgrey',
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
    },
    detailsBtnText: {
        color: 'rgb(10, 132, 255)',
        fontSize: 18,
    },
    declineText: {
        fontSize: 18
    },
    detailsContainer: {

    },
    priceShare: {
        fontSize: 18,
        color: 'red'
    },
    requesterContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    requesterImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10
    },
    requesterText: {
        fontSize: 20
    },
    shareText: {
        fontSize: 17
    },
    splitAmountContainer: {
        alignItems: 'center'
    }
});

export default SplitRequest;