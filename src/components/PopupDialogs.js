import React, { useState } from 'react';
import { 
    TouchableOpacity, 
    Text, 
    View
} from 'react-native';
import Modal from "react-native-modal";
import ViewStyles from '../styles/ViewStyles';

const ErrorPopup = ({ errorMessage, setFailed }) => {
    const [isVisible, setVisible] = useState(true);
    const handleDismiss = () => {
        setVisible(false);
    }

    return (
        <View>
            <Modal isVisible={isVisible}>
                <View style={ViewStyles.modalView}>
                    <View style={ViewStyles.popupBG}>
                        <Text style={ViewStyles.popupMessageText}>{ errorMessage }</Text>
                        <TouchableOpacity 
                            style={ViewStyles.popupButton}
                            onPress={() => { handleDismiss(); setFailed(false); }}>
                            <Text style={ViewStyles.popupButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export { ErrorPopup };