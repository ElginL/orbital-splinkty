import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList 
} from 'react-native';
import { getCurrentUser } from '../firebase/loginAPI';
import { useSelector } from 'react-redux';
import Contact from './Contact';

const FriendsPayments = () => {
    const currentUser = getCurrentUser();
    let friends = useSelector(state => state.friendship.friendsWithPayments);

    friends = friends.map(obj => {
        const otherToUser = obj.data.payments.otherToUser;
        const userToOther = obj.data.payments.userToOther;
        
        const amount = Math.abs(otherToUser - userToOther);
        const friend = obj.data.otherUser === currentUser 
            ? obj.data.user 
            : obj.data.otherUser;
        const isOweFriend = (obj.data.otherUser === currentUser &&
            otherToUser > userToOther) || 
            (obj.data.user === currentUser && 
            userToOther > otherToUser);
        
        return {
            amount,
            friend,
            isOweFriend,
            id: obj.id
        };
    });

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Your Friends</Text>
            {
                (() => {
                    if (friends.length === 0) {
                        return (
                            <Text style={styles.emptyText}>No Friends Yet...</Text>
                        )
                    }
                    
                    return (
                        <FlatList
                            keyExtractor={item => item.id}
                            listKey={item => item.id}
                            data={friends}
                            renderItem={({ item }) => (
                                <Contact item={item} />
                            )}
                        />
                    )
                })()
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    sectionHeader: {
        fontSize: 33   
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 30,
    }
});

export default FriendsPayments;