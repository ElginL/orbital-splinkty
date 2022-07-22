import Modal from 'react-native-modal';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const ErrorMessageModal = ({
    message,
    isVisible,
    onClose
}) => {
    console.log(isVisible);
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}>
            <View style={styles.container}>
                <Text style={styles.error}>Error</Text>
                <Text style={styles.message}>{message}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        zIndex: 10000
    },
    error: {
        color: 'red',
        margin: 10,
        marginBottom: 20,
        fontSize: 25
    },
    modal: {
        alignItems: 'center'
    },
    message: {
        fontSize: 15,
        textAlign: 'center'
    }
})

export default ErrorMessageModal;