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
                    <View style={styles.optionContainer}>
                        <FontAwesome name="camera" size={24} color="black" />
                        <TouchableOpacity onPress={async () => {
                            await openCameraHandler();
                            onClose();
                        }}>
                            <Text style={styles.optionText}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <HorizontalLine />
                    <View style={styles.optionContainer}>
                        <FontAwesome name="photo" size={24} color="black" />
                        <TouchableOpacity onPress={async () => {
                            await pickImageHandler();
                            onClose();
                        }}>
                            <Text style={styles.optionText}>
                                Photos Gallery
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <HorizontalLine />
                    <View style={styles.optionContainer}>
                        <FontAwesome name="hand-pointer-o" size={24} color="black" />
                        <TouchableOpacity onPress={() => {
                            onClose();
                            addManuallyHandler();
                        }}>
                            <Text style={styles.optionText}>
                                Add Manually
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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