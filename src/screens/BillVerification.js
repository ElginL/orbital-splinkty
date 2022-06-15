import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import ContactBill from '../components/ContactBill';

const BillVerification = () => {
    const receiptItems = useSelector(state => state.receipt.receiptItems);
    const profileImgs = useSelector(state => state.users.profilePictures);
    const activeGroupMembers = useSelector(state => state.receipt.activeGroupMembers);

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item}
                data={activeGroupMembers}
                renderItem={({ item }) => (
                    <ContactBill
                        email={item}
                        receiptItems={receiptItems}
                        profileImg={profileImgs[item]}
                    />
                )}
            />
            <View style={styles.confirmBtnContainer}>
                <TouchableOpacity style={styles.confirmBtn}>
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