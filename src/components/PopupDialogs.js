import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import ViewStyles from '../styles/ViewStyles';

function LoggedInPopup({ setShowLoggedIn }) {
    const [isVisible, setVisible] = useState(true);
    const handleDismiss = () => {
        setVisible(false);
        setShowLoggedIn(false);
    }
    return (
        <View>
            <Modal isVisible={isVisible}>
                <View style={ViewStyles.modalView}>
                    <View style={ViewStyles.popupBG}>
                        <Text style={ViewStyles.popupMessageText}>You have logged in.</Text>
                        <TouchableOpacity 
                            style={ViewStyles.popupButton}
                            onPress={handleDismiss}>
                            <Text style={ViewStyles.popupButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );  
};

function LoggedOutPopup() {
    const [isVisible, setVisible] = useState(true);
    const handleDismiss = () => {
        setVisible(false);
    }
    return (
        <View>
            <Modal isVisible={isVisible}>
                <View style={ViewStyles.modalView}>
                    <View style={ViewStyles.popupBG}>
                        <Text style={ViewStyles.popupMessageText}>You have logged out.</Text>
                        <TouchableOpacity 
                            style={ViewStyles.popupButton}
                            onPress={handleDismiss}>
                            <Text style={ViewStyles.popupButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );  
};

function SignedUpPopup({ setSignedUp }) {
    const [isVisible, setVisible] = useState(true);
    const handleDismiss = () => {
        setVisible(false);
    }
    return (
        <View>
            <Modal isVisible={isVisible}>
                <View style={ViewStyles.modalView}>
                    <View style={ViewStyles.popupBG}>
                        <Text style={ViewStyles.popupMessageText}>Sign Up Successful!</Text>
                        <TouchableOpacity 
                            style={ViewStyles.popupButton}
                            onPress={() => { handleDismiss(); setSignedUp(false); }}>
                            <Text style={ViewStyles.popupButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );  
};

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

export { SignedUpPopup, ErrorPopup };