import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { 
    addDoc,
    collection,
} from 'firebase/firestore';
import { db, getCurrentUser } from '../firebase/loginAPI';
import { useDispatch, useSelector } from 'react-redux';
import { emptyReceiptStore } from '../store/receiptSlice';
import ContactBill from '../components/ContactBill';
import ErrorMessageModal from '../components/ErrorMessageModal';

const BillVerification = ({ navigation }) => {
    const dispatch = useDispatch();

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const profileImgs = useSelector(state => state.users.profilePictures);
    let activeGroupMembers = useSelector(state => state.receipt.activeGroupMembers);
    const receiptItems = useSelector(state => state.receipt.receiptItems);

    activeGroupMembers = activeGroupMembers.map(member => {
        let totalPrice = 0;

        return {
            ...member,
            items: member.items.map(memberItem => {
                const receiptItemIndex = receiptItems.findIndex(receiptItem => {
                    return receiptItem.description === memberItem.description;
                });

                const priceShare = parseFloat((receiptItems[receiptItemIndex].price
                    / receiptItems[receiptItemIndex].initialQuantity
                    * memberItem.quantity).toFixed(2));

                totalPrice += priceShare
                
                return {
                    ...memberItem,
                    priceShare
                }
            }),
            totalPrice
        }
    })

    const confirmBtnHandler = () => {
        setErrorModalVisible(true);

        if (activeGroupMembers.length === 0) {
            setErrorMessage("No members to split with found");
            return;
        } else if (receiptItems.length === 0) {
            setErrorMessage("No items to split!");
            return;
        }

        activeGroupMembers.forEach(async member => {
            if (member.items.length === 0) {
                return;
            }

            await addDoc(collection(db, "splitrequests"), {
                from: getCurrentUser(),
                to: member.email,
                totalPrice: member.totalPrice,
                items: member.items.map(item => {
                    return {
                        description: item.description,
                        quantity: item.quantity,
                        priceShare: item.priceShare
                    }
                })
            });
        });

        dispatch(emptyReceiptStore());
        navigation.navigate("Outgoing Requests");
    }

    return (
        <ScrollView style={styles.container}>
            {
                activeGroupMembers.length === 0
                    ? (
                        <Text style={styles.noText}>
                            No members in this split request... {'\n'}
                            Return to select active group members
                        </Text>
                    )
                    : (
                        activeGroupMembers.map(member => (
                            <ContactBill
                                member={member}
                                profileImg={profileImgs[member.email]}
                                key={member.email}
                            />
                        ))
                    ) 
            }
            <View style={styles.confirmBtnContainer}>
                <TouchableOpacity style={styles.confirmBtn}
                    onPress={confirmBtnHandler}>
                    <Text style={styles.confirmBtnText}>
                        Confirm Split
                    </Text>
                </TouchableOpacity>                
            </View>
            <ErrorMessageModal
                message={errorMessage}
                isVisible={errorModalVisible}
                onClose={() => setErrorModalVisible(false)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    confirmBtnContainer: {
        flex: 0.3,
        alignItems: 'center'
    },
    confirmBtnText: {
        fontSize: 18,
        color: 'rgb(10, 132, 255)'
    },
    noText: {
        fontStyle: 'italic',
        fontWeight: '300',
        marginVertical: 100,
        textAlign: 'center'
    }
})

export default BillVerification;