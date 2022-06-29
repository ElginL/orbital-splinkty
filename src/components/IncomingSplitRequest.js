import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
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

        let requestSenderDoc = null;
        let requestReceiverDoc = null;
        usersQuerySnapshot.forEach(doc => {
            if (doc.data().email === item.from) {
                requestSenderDoc = doc;
            } else {
                requestReceiverDoc = doc;
            }
        })

        const friendshipDocRef = doc(db, 'friendship', friendshipDoc.id);
        const requestSenderDocRef = doc(db, 'users', requestSenderDoc.id);
        const requestReceiverDocRef = doc(db, 'users', requestReceiverDoc.id);
        if (friendshipDoc.data().paymentAmount === 0) {
            await updateDoc(friendshipDocRef, {
                isOweIndex1: friendshipDoc.data().connection[1] === item.from,
                paymentAmount: item.totalPrice
            });

            await updateDoc(requestSenderDocRef, {
                peopleToReceive: requestSenderDoc.data().peopleToReceive + 1,
                total: {
                    ...requestSenderDoc.data().total,
                    receiving: requestSenderDoc.data().total.receiving + item.totalPrice
                }
            });

            await updateDoc(requestReceiverDocRef, {
                peopleToPay: requestReceiverDoc.data().peopleToPay + 1,
                total: {
                    ...requestReceiverDoc.data().total,
                    paying: requestReceiverDoc.data().total.paying + item.totalPrice
                }
            })
        } else {
            if (friendshipDoc.data().isOweIndex1 && friendshipDoc.data().connection[1] === item.from ||
                !friendshipDoc.data().isOweIndex1 && friendshipDoc.data().connection[0] === item.from) {
        
                await updateDoc(friendshipDocRef, {
                    paymentAmount: item.totalPrice + friendshipDoc.data().paymentAmount
                });
        
                await updateDoc(requestSenderDocRef, {
                    total: {
                        ...requestSenderDoc.data().total,
                        receiving: requestSenderDoc.data().total.receiving + item.totalPrice
                    }
                })
        
                await updateDoc(requestReceiverDocRef, {
                    total: {
                        ...requestReceiverDoc.data().total,
                        paying: requestReceiverDoc.data().total.paying + item.totalPrice
                    }
                })
            }
            else if (friendshipDoc.data().isOweIndex1 && friendshipDoc.data().connection[1] === item.to ||
                !friendshipDoc.data().isOweIndex1 && friendshipDoc.data().connection[0] === item.to) {
                const newPaymentAmount = parseFloat((friendshipDoc.data().paymentAmount - item.totalPrice).toFixed(2));

                if (newPaymentAmount === 0) {
                    await updateDoc(friendshipDocRef, {
                        isOweIndex1: true,
                        paymentAmount: 0
                    })
            
                    await updateDoc(requestSenderDocRef, {
                        peopleToPay: requestSenderDoc.data().peopleToPay - 1,
                        total: {
                            ...requestSenderDoc.data().total,
                            paying: requestSenderDoc.data().total.paying - item.totalPrice
                        }
                    })
            
                    await updateDoc(requestReceiverDocRef, {
                        peopleToReceive: requestReceiverDoc.data().peopleToReceive - 1,
                        total: {
                            ...requestReceiverDoc.data().total,
                            receiving: requestReceiverDoc.data().total.receiving - item.totalPrice
                        }
                    })
                } else if (newPaymentAmount < 0) {
                    await updateDoc(requestSenderDocRef, {
                        peopleToPay: requestSenderDoc.data().peopleToPay - 1,
                        peopleToReceive: requestSenderDoc.data().peopleToReceive + 1,
                        total: {
                            paying: requestSenderDoc.data().total.paying - friendshipDoc.data().paymentAmount,
                            receiving: requestSenderDoc.data().total.receiving + Math.abs(newPaymentAmount)
                        }
                    })
            
                    await updateDoc(requestReceiverDocRef, {
                        peopleToPay: requestReceiverDoc.data().peopleToPay + 1,
                        peopleToReceive: requestReceiverDoc.data().peopleToReceive - 1,
                        total: {
                            paying: requestReceiverDoc.data().total.paying + Math.abs(newPaymentAmount),
                            receiving: requestReceiverDoc.data().total.receiving - friendshipDoc.data().paymentAmount
                        }
                    })
            
                    await updateDoc(friendshipDocRef, {
                        isOweIndex1: !friendshipDoc.data().isOweIndex1,
                        paymentAmount: Math.abs(newPaymentAmount)
                    })
                } else {
                    await updateDoc(friendshipDocRef, {
                        paymentAmount: newPaymentAmount
                    })
            
                    await updateDoc(requestSenderDocRef, {
                        total: {
                            ...requestSenderDoc.data().total,
                            paying: requestSenderDoc.data().total.paying - item.totalPrice,
                        }
                    })
            
                    await updateDoc(requestReceiverDocRef, {
                        total: {
                            ...requestReceiverDoc.data().total,
                            receiving: requestReceiverDoc.data().total.receiving - item.totalPrice
                        }
                    })
                }
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
                        cache="only-if-cached"
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
        marginRight: 10,
        overflow: 'hidden'
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