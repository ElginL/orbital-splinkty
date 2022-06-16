import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Image
} from 'react-native';

const FriendRequest = ({ item, declineHandler, acceptHandler, url }) => {
    return (
        <View style={styles.requestContainer}>
            <View style={styles.userDisplay}>
                <Image 
                    source={{ uri: url }} 
                    style={styles.contactImg} 
                />
                <Text style={styles.name}>
                    {item.from}
                </Text>
            </View>
            <View style={styles.btnsContainer}>
                <TouchableOpacity 
                    style={styles.acceptBtn}
                    onPress={() => acceptHandler(item.from, item.id)}>
                    <Text style={styles.acceptText}>
                        Confirm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.declineBtn}
                    onPress={() => declineHandler(item.id)}>
                    <Text style={styles.declineText}>
                        Decline
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    acceptBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#24a0ed'
    },
    acceptText: {
        color: 'white'
    },
    btnsContainer: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-between'
    },
    declineBtn: {
        backgroundColor: 'lightgrey',
        padding: 5,
        paddingHorizontal: 10,
        marginLeft: 10
    },
    declineText: {
        color: 'black'
    },
    contactImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    name: {
        fontSize: 17
    },
    requestContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    userDisplay: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default FriendRequest;