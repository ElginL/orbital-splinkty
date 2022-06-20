import {
    View,
    Text,
    StyleSheet,
    FlatList,
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

const BillVerification = ({ navigation }) => {
    const dispatch = useDispatch();

    const profileImgs = useSelector(state => state.users.profilePictures);
    const activeGroupMembers = useSelector(state => state.receipt.activeGroupMembers);

    const confirmBtnHandler = () => {
        activeGroupMembers.forEach(async member => {
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
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item.email}
                data={activeGroupMembers}
                renderItem={({ item }) => (
                    <ContactBill
                        member={item}
                        profileImg={profileImgs[item.email]}
                    />
                )}
            />
            <View style={styles.confirmBtnContainer}>
                <TouchableOpacity style={styles.confirmBtn}
                    onPress={confirmBtnHandler}>
                    <Text style={styles.confirmBtnText}>
                        Confirm Split
                    </Text>
                </TouchableOpacity>                
            </View>
        </View>
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
    }
})

export default BillVerification;