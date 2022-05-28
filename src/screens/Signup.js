import React, { useState, useEffect } from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    TextInput, 
    Keyboard, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
} from 'react-native';
import { createUser } from '../firebase/loginAPI';
import HorizontalLine from '../components/HorizontalLine';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthStyles from '../styles/AuthStyles';
import LoadingOverlay from '../components/LoadingOverlay';
import { SignedUpPopup, ErrorPopup } from '../components/PopupDialogs';
import getErrorMessage from '../firebase/authErrorMessages';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSignedUp, setSignedUp] = useState(false);
    const [isFailed, setFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signUpHandler = () => {
        setIsLoading(true);
        try {
            createUser(email, password, confirmPassword)
            .then(setSignedUp(true))
            .catch((error) => {
                signUpFailHandler(error);
            });
        } catch (error) {
            signUpFailHandler(error);
        }
        
    };

    const signUpFailHandler = (error) => {
        setIsLoading(false);
        setFailed(true);
        setErrorMessage(getErrorMessage(error.code));
    }

    const renderLoading = () => {
        if (isLoading) {
            return <LoadingOverlay />;
        } else {
            return;
        }
    }

    const renderError = () => {
        if (isFailed) {
            return <ErrorPopup errorMessage={errorMessage} setFailed={setFailed}/> 
        } else {
            return;
        }
    }

    const renderSignedUp = () => {
        if (isSignedUp) {
            return <SignedUpPopup setSignedUp={setSignedUp} />
        } else {
            return;
        }
    }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={AuthStyles.screenContainer}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={AuthStyles.screenContainer}>
                    <Image 
                        style={AuthStyles.teamLogo}
                        source={require('../assets/SplinktyIcon.png')}
                    />
                    <Text style={AuthStyles.headerTitle}>Sign Up Page</Text>
                    <View style={AuthStyles.formContainer}>
                        <TextInput
                            style={AuthStyles.textInput}
                            onChangeText={input => setEmail(input)}
                            keyboardType="email-address"
                            placeholder="Enter your email address"
                        />
                        <TextInput
                            style={AuthStyles.textInput}
                            onChangeText={input => setPassword(input)}
                            placeholder="Enter your password"
                            secureTextEntry
                        />
                        <TextInput
                            style={AuthStyles.textInput}
                            onChangeText={input => setConfirmPassword(input)}
                            placeholder="Confirm Password"
                            secureTextEntry
                        />
                        <TouchableOpacity 
                            style={AuthStyles.blueBGBtn}
                            onPress={
                                signUpHandler
                            }>
                            <Text style={AuthStyles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <HorizontalLine />
                        <TouchableOpacity 
                            style={AuthStyles.blueBGBtn}
                            onPress={() => navigation.navigate("Login")}>
                            <Text style={AuthStyles.buttonText}>Go back to sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {renderLoading()}
            {renderError()}
            {renderSignedUp()}
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default Signup;