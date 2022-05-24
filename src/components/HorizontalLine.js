import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
    return (
        <View style={styles.line}>
        </View>
    )
};

const styles = StyleSheet.create({
    line: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.8,
        width: '100%'
    }
})

export default HorizontalLine;