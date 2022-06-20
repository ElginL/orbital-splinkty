import {
    FlatList,
    StyleSheet, 
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import ContactSimple from './ContactSimple';

const Top3Payments = () => {
    const profileImgs = useSelector(state => state.users.profilePictures);

    const friendsWithPayment = useSelector(state => state.friendship.friendsWithPayments);
    const sortedFriendsWithPayment = [...friendsWithPayment].sort((first, second) => {
        return second.amount - first.amount;
    });

    let top3Payments = sortedFriendsWithPayment.slice(0, 3);
    top3Payments = top3Payments.filter(payment => payment.amount > 0);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>
                Top Outstanding Payments
            </Text>
            {
                top3Payments.length === 0
                    ? <Text style={styles.emptyText}>No Outstanding Payments!</Text>
                    : (
                        <FlatList
                            keyExtractor={item => item.id}
                            listKey={item => item.id}
                            data={top3Payments}
                            renderItem={({ item }) => (
                                <ContactSimple
                                    item={item}
                                    profileImg={profileImgs[item.friend]} 
                                />
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