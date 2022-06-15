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
    
    const friendsWithPayment = useSelector(state => state.friendship.friendsWithPayments);
    const sortedFriendsWithPayment = [...friendsWithPayment].sort((first, second) => {
        return second.data.payments.payment - first.data.payments.payment;
    });
    sortedFriendsWithPayment.splice(3)

    const top3Payments = sortedFriendsWithPayment.map(obj => {
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
        for (const payment of top3Payments) {
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
                            data={top3Payments}
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