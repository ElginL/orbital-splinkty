import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import HorizontalLine from './HorizontalLine';
import { FontAwesome } from '@expo/vector-icons';

const SplitBillMethodsModal = ({ 
    isVisible, 
    onClose,
    addManuallyHandler,
    openCameraHandler,
    pickImageHandler 
}) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}>
            <View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={async () => {
                            await openCameraHandler();
                            onClose();
                        }}>
                        <FontAwesome name="camera" size={24} color="black" />
                        <Text style={styles.optionText}>
                            Camera
                        </Text>
                    </TouchableOpacity>
                    <HorizontalLine />
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={async () => {
                            await pickImageHandler();
                            onClose()}
                        }>
                        <FontAwesome name="photo" size={24} color="black" />
                        <Text style={styles.optionText}>
                            Photos Gallery
                        </Text>
                    </TouchableOpacity>
                    <HorizontalLine />
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            onClose();
                            addManuallyHandler();
                        }}>
                        <FontAwesome name="hand-pointer-o" size={24} color="black" />
                        <Text style={styles.optionText}>
                            Add Manually
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={styles.cancelBtn}
                    onPress={() => onClose()}>
                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    button: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cancelBtn: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 20
    },
    cancelText: {
        fontSize: 18,
        textAlign: 'center',
        padding: 15,
    },
    modal: {
        justifyContent: 'flex-end'
    },
    optionsContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30
    },
    optionText: {
        padding: 15,
        fontSize: 18
    }
})

export default SplitBillMethodsModal;