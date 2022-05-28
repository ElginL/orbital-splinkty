import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
} from 'react-native';

const FriendRequest = ({ item, declineHandler, acceptHandler }) => {
    return (
        <View style={styles.requestContainer}>
            <Text>{item.from}</Text>
            <View style={styles.btnsContainer}>
                <TouchableOpacity
                    style={styles.declineBtn}
                    onPress={() => declineHandler(item.id)}>
                    <Text style={styles.declineText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.acceptBtn}
                    onPress={() => acceptHandler(item.from, item.id)}>
                    <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    requestContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnsContainer: {
        flexDirection: 'row',
        width: '45%',
        justifyContent: 'space-between'
    },
    acceptBtn: {
        borderWidth: 1,
        padding: 5,
        borderColor: 'green'
    },
    acceptText: {
        color: 'green'
    },
    declineBtn: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 5
    },
    declineText: {
        color: 'red'
    },
});

export default FriendRequest;