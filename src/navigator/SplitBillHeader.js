import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import CreateSplitRequestBtn from '../components/CreateSplitRequestBtn';

const SplitBill = ({ navigation }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>
                Split Bill
            </Text>
            <CreateSplitRequestBtn 
                style={styles.plusBtn}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500'
    },
});

export default SplitBill;