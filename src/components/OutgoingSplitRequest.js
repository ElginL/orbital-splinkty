import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import {
    doc,
    deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/loginAPI';
import HorizontalLine from './HorizontalLine';
import SplitDetailsModal from './SplitDetailsModal';

const OutgoingSplitRequest = ({ item }) => {
    const profileImgs = useSelector(state => state.users.profilePictures);

    const [modalVisible, setModalVisible] = useState(false);

    const cancelHandler = async () => {
        const splitRequestDocRef = doc(db, "splitrequests", item.id);
        await deleteDoc(splitRequestDocRef);
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.senderContainer}>
                    <Image
                        source={{ uri: profileImgs[item.to], cache: 'only-if-cached' }}
                        style={styles.profileImg}
                    />
                    <View style={styles.senderDetailsContainer}>
                        <Text style={styles.senderText}>
                            {item.to}
                        </Text>
                        <TouchableOpacity 
                            style={styles.cancelBtn}
                            onPress={() => cancelHandler()}>
                            <Text style={styles.cancelText}>Cancel Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.splitPriceText}>Split Price</Text>
                    <Text style={styles.priceShare}>${item.totalPrice}</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.detailsText}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SplitDetailsModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                item={item}
                isIncoming={false}
            />
            <HorizontalLine />
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10
    },
    cancelBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 20,
        marginTop: 10
    },
    cancelText: {
        color: 'red',
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between'
    },
    detailsText: {
        color: 'rgb(10, 132, 255)',
        fontSize: 18
    },
    priceContainer: {
        alignItems: 'center'
    },
    priceShare: {
        color: 'green',
        fontSize: 18
    },
    senderContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    senderText: {
        fontSize: 20
    },
    splitPriceText: {
        fontSize: 17
    }
});

export default OutgoingSplitRequest;