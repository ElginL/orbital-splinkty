import Modal from 'react-native-modal';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

const DeleteFriendModal = ({ 
    isVisible, 
    deleteFriendHandler,
    onClose 
}) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.dialogue}>Are you sure?</Text>
                <Text style={styles.additionalDialogue}>This action is irreversible</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={styles.noBtn}
                        onPress={onClose}>
                        <Text style={styles.noText}>
                            No
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.yesBtn}
                        onPress={deleteFriendHandler}>
                        <Text style={styles.yesText}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    additionalDialogue: {
        fontStyle: 'italic',
        marginBottom: 30,
        fontSize: 12
    },
    buttonsContainer: {
        width: '65%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    container: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 15,
        alignItems: 'center',
    },
    dialogue: {
        fontSize: 25,
        marginTop: 20
    },
    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    noBtn: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    noText: {
        color: 'white',
        fontSize: 18
    },
    yesBtn: {
        backgroundColor: '#24a0ed',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    yesText: {
        color: 'white',
        fontSize: 18
    },
});

export default DeleteFriendModal;