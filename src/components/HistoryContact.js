import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';

const HistoryContact = ({ itemArr, isReceived }) => {
    const photoURLS = useSelector(state => state.users.profilePictures);

    return (
        <View>
            {
                itemArr.map(item => (
                    <View key={item.id}>
                        {
                            item.date
                                ? (
                                    <View style={styles.dateContainer}>
                                        <Text>
                                            {item.date}
                                        </Text>
                                    </View>
                                )
                                : null
                        }
                        <View style={styles.outerContainer}>
                            <View style={styles.container}>
                                <Image
                                    source={{ 
                                        uri: isReceived ? photoURLS[item.sender] : photoURLS[item.receiver],
                                        cache: "only-if-cached" 
                                    }}
                                    style={styles.profileImg}
                                />
                                <View>
                                    {
                                        isReceived
                                            ? (
                                                <Text style={styles.payText}>
                                                    {item.sender}
                                                </Text>
                                            )
                                            : (
                                                <Text style={styles.payText}>
                                                    {item.receiver}
                                                </Text>
                                            )
                                    }
                                    <Text style={styles.timeText}>
                                        Time: {item.time}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.amount}>
                                ${item.amount.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
};

const styles = StyleSheet.create({
    amount: {
        padding: 10,
        fontSize: 20
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    dateContainer: {
        backgroundColor: 'lightgrey',
        padding: 10
    },
    outerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    payText: {
        fontSize: 18,
    },
    profileImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
    },
    timeText: {
        fontStyle: 'italic',
        fontWeight: '300',
        fontSize: 13
    }
});

export default HistoryContact;