import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';

const PayReceiveHistory = () => {

    return (
        <View style={styles["container"]}>
            <Text>Pay received</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default PayReceiveHistory;