import {
    StyleSheet, 
    Text,
    View,
    FlatList
} from 'react-native';
import { getCurrentUser } from '../firebase/loginAPI';
import { useSelector } from 'react-redux';
import ContactSimple from './ContactSimple';

const Top3Payments = () => {
    const profilePictures = useSelector(state => state.users.profilePictures);
    
    const currTop3Payments = useSelector(state => state.currUser.top3Payments);
    const currTop3PaymentsCopy = currTop3Payments.map(obj => {
        const amount = obj.data.payments.payment;

        const friend = obj.data.otherUser === getCurrentUser()
            ? obj.data.user 
            : obj.data.otherUser;
            
        const isOweFriend = (obj.data.payments.isOweOtherUser && friend == obj.data.otherUser) || 
                            (!obj.data.payments.isOweOtherUser && friend == obj.data.user);
        
        return {
            amount,
            friend,
            isOweFriend,
            friendProfilePicURL: profilePictures[friend],
            id: obj.id
        };
    });

    const hasTopOutstandingPayments = () => {
        for (const payment of currTop3PaymentsCopy) {
            if (payment.amount !== 0) {
                return true;
            }
        }
        return false;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Top Outstanding Payments</Text>
            {
                !hasTopOutstandingPayments()
                    ? <Text style={styles.emptyText}>No Outstanding Payments!</Text>
                    : (
                        <FlatList
                            keyExtractor={item => item.id}
                            listKey={item => item.id}
                            data={currTop3PaymentsCopy}
                            renderItem={({ item }) => (
                                <ContactSimple item={item} />
                            )}
                        />
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 30,
    },
    sectionHeader: {
        fontSize: 28,
        margin: 10,
        textAlign: 'center'
    }
});

export default Top3Payments;