import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const PaySentHistory = () => {
    return (
        <View style={styles.container}>
            <Text>Pay Sent</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default PaySentHistory;