import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import Modal from 'react-native-modal';
import {
    doc,
    updateDoc,
    addDoc,
    collection,
    serverTimestamp
} from 'firebase/firestore';
import { db, getCurrentUser } from '../firebase/loginAPI';
import { Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { sendPushNotification } from '../firebase/notifications';
import { changePayments } from '../firebase/users';

const PaymentModal = ({
    isVisible,
    onClose,
    item,
    notifToken,
}) => {
    const openWithLink = link => {
        Linking.openURL(link);
    };

    const payHandler = async () => {
        const docRef = doc(db, "friendship", item.id);

        // Change payment amount to 0 in friendship document.
        await updateDoc(docRef, {
            paymentAmount: 0
        });

        // Add to payment history collection.
        await addDoc(collection(db, "payhistory"), {
            timestamp: serverTimestamp(),
            sender: getCurrentUser(),
            receiver: item.friend,
            amount: item.amount
        });

        // Update users doc for friend and the current user.
        await changePayments(getCurrentUser(), item.amount, true);
        await changePayments(item.friend, item.amount, false);

        await sendPushNotification(
            notifToken,
            "Payment Received",
            `${getCurrentUser()} paid you $${item.amount.toFixed(2)}`
        );

        onClose();
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            style={styles.modal}>
            <View style={styles.container}>
                <Entypo 
                    name="cross" 
                    size={40} 
                    color="black" style={styles.cross}
                    onPress={onClose} 
                />
                <Text style={styles.modalHeading}>
                    Choose your payment method
                </Text>
                <View style={styles.btnsContainer}>
                    <TouchableOpacity 
                        style={styles.bankBtn}
                        onPress={() => openWithLink("https://www.dbs.com.sg/personal/mobile/paylink/index.html")}
                        >
                        <Image
                            source={require('../assets/DBS.png')}
                            style={styles.bankImg}
                        />
                        <Text style={styles.bankText}>
                            PayLah
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bankBtn}
                        onPress={() => openWithLink("https://gpay.app.goo.gl/kHXsJi")}
                        >
                        <Image
                            source={require('../assets/google.png')}
                            style={styles.bankImg}
                        />
                        <Text style={styles.bankText}>
                            Google Pay
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.qnText}>
                    Already completed your payments?
                </Text>
                <View style={styles.yesNoContainer}>
                    <TouchableOpacity 
                        style={styles.noBtn}
                        onPress={onClose}>
                        <Text style={styles.noText}>
                            No
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.yesBtn}
                        onPress={async () => await payHandler()}>
                        <Text style={styles.yesText}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingBottom: 100,
        borderRadius: 17
    },
    bankBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        width: '100%',
        marginVertical: 10
    },
    bankImg: {
        width: 50,
        height: 50
    },
    btnsContainer: {
        alignItems: 'center'
    },
    bankText: {
        marginHorizontal: 20,
        fontSize: 18
    },
    cross: {
        marginVertical: 10,
    },
    modal: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        margin: 0
    },
    modalHeading: {
        fontSize: 19,
        textAlign: 'center',
        marginBottom: 30
    },
    noBtn: {
        backgroundColor: 'lightgrey',
        padding: 5,
        paddingHorizontal: 22,
    },
    noText: {
        color: 'black',
        fontSize: 20
    },
    qnText: {
        fontSize: 19,
        textAlign: 'center',
        marginVertical: 20
    },
    yesBtn: {
        paddingVertical: 5,
        paddingHorizontal: 22,
        backgroundColor: '#24a0ed'
    },
    yesText: {
        color: 'white',
        fontSize: 20
    },
    yesNoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default PaymentModal;