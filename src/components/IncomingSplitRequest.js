import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
    getDocs,
    collection,
    query,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import { db } from '../firebase/loginAPI';
import HorizontalLine from './HorizontalLine';
import SplitDetailsModal from './SplitDetailsModal';

const IncomingSplitRequest = ({ item }) => {
    const profileImgs = useSelector(state => state.users.profilePictures);

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);

    const acceptHandler = async () => {
        await declineHandler();

        const usersQuery = query(collection(db, "users"), where('email', 'in', [item.to, item.from]));
        const usersQuerySnapshot = await getDocs(usersQuery);

        const friendshipQuery = query(collection(db, "friendship"), where('connection', 'array-contains', item.to));
        const friendshipSnapshot = await getDocs(friendshipQuery);

        let friendshipDoc = null;
        for (const doc of friendshipSnapshot.docs) {
            if (doc.data().connection[0] === item.to && doc.data().connection[1] === item.from ||
                doc.data().connection[1] === item.to && doc.data().connection[0] === item.from) {
                friendshipDoc = doc;
                break;
            }
        }

        // Update users collection.
        usersQuerySnapshot.forEach(async document => {
            const userDocRef = doc(db, "users", document.id);
            if (document.data().email === item.from) {
                if (friendshipDoc.data().paymentAmount === 0) {
                    await updateDoc(userDocRef, {
                        peopleToReceive: document.data().peopleToReceive + 1,
                    });
                }

                await updateDoc(userDocRef, {
                    total: {
                        paying: document.data().total.paying,
                        receiving: document.data().total.receiving + item.totalPrice
                    }
                });
            } else {
                if (friendshipDoc.data().paymentAmount === 0) {
                    await updateDoc(userDocRef, {
                        peopleToPay: document.data().peopleToPay + 1
                    })
                }

                await updateDoc(userDocRef, {
                    total: {
                        paying: document.data().total.paying + item.totalPrice,
                        receiving: document.data().total.receiving
                    }
                });
            }
        })

        // Update friendship collection
        const friendshipDocRef = doc(db, 'friendship', friendshipDoc.id);
        if (friendshipDoc.data().paymentAmount === 0) {
            await updateDoc(friendshipDocRef, {
                isOweIndex1: friendshipDoc.data().connection[0] !== item.from,
                paymentAmount: item.totalPrice
            })
        } else if (friendshipDoc.data().connection[0] === item.from) {
            if (friendshipDoc.data().isOweIndex1) {
                const newPaymentAmount = friendshipDoc.data().paymentAmount - item.totalPrice;
                await updateDoc(friendshipDocRef, {
                    isOweIndex1: newPaymentAmount >= 0,
                    paymentAmount: Math.abs(newPaymentAmount)
                });
            } else {
                await updateDoc(friendshipDocRef, {
                    paymentAmount: friendshipDoc.data().paymentAmount + item.totalPrice
                });
            }
        } else if (friendshipDoc.data().connection[1] === item.from) {
            if (friendshipDoc.data().isOweIndex1) {
                await updateDoc(friendshipDocRef, {
                    paymentAmount: friendshipDoc.data().paymentAmount + item.totalPrice
                });
            } else {
                const newPaymentAmount = friendshipDoc.data().paymentAmount - item.totalPrice;
                await updateDoc(friendshipDocRef, {
                    isOweIndex1: newPaymentAmount < 0,
                    paymentAmount: Math.abs(newPaymentAmount)
                });
            }
        }
    }

    const declineHandler = async () => {
        const splitRequestDocRef = doc(db, "splitrequests", item.id);
        await deleteDoc(splitRequestDocRef);
    }

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
                            <TouchableOpacity 
                                style={styles.acceptBtn}
                                onPress={() => acceptHandler()}>
                                <Text style={styles.acceptText}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.declineBtn}
                                onPress={() => declineHandler()}>
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
                isIncoming={true}
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
        alignItems: 'center',
        padding: 20
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

export default IncomingSplitRequest;