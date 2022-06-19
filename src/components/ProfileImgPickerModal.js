import Modal from 'react-native-modal';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HorizontalLine from './HorizontalLine';

const ProfileImgPickerModal = ({
    isVisible,
    onClose,
    onImageLibraryPress,
    onCameraPress,
    onDeletePress
}) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}>
            <SafeAreaView style={styles.container}>
                <View style={styles.selectionGroup}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onImageLibraryPress}>
                        <MaterialIcons 
                            name="insert-photo" 
                            size={24} 
                            color="black" 
                        />
                        <Text style={styles.buttonText}>
                            Library
                        </Text>
                    </TouchableOpacity>
                    <HorizontalLine />
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onCameraPress}>
                        <MaterialIcons 
                            name="camera-alt" 
                            size={24} 
                            color="black" 
                        />
                        <Text style={styles.buttonText}>
                            Camera
                        </Text>
                    </TouchableOpacity>
                    <HorizontalLine />
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onDeletePress}>
                        <MaterialIcons 
                            name="delete" 
                            size={24} 
                            color="black" 
                        />
                        <Text style={styles.buttonText}>
                            Remove Image
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={styles.cancelBtn} 
                    onPress={onClose}>
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        width: '100%',
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18
    },
    selectionGroup: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10
    },
    cancelBtn: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20
    }
});

export default ProfileImgPickerModal;