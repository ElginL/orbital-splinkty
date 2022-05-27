import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput, 
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image
} from 'react-native';
import HorizontalLine from "../components/HorizontalLine";
import AuthStyles from '../styles/AuthStyles';
import { logInUser } from '../firebase/loginAPI';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingOverlay from '../components/LoadingOverlay';
import { ErrorPopup } from '../components/PopupDialogs';
import getErrorMessage from '../firebase/authErrorMessages';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setFailed] = useState(false);
    const [isLoggedOut, setLoggedOut] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const logInHandler = () => {
        setIsLoading(true);
        logInUser(email, password)
            .then(() => {})
            .catch((error) => {
                logInFailHandler(error);
            });
    };

    const logInFailHandler = (error) => {
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
                    <Text style={AuthStyles.headerTitle}>Account Login</Text>
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
                        <TouchableOpacity 
                            style={AuthStyles.blueBGBtn}
                            onPress={
                                logInHandler
                            }>
                            <Text style={AuthStyles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        <HorizontalLine />
                        <TouchableOpacity 
                            style={AuthStyles.blueBGBtn}
                            onPress={() => navigation.navigate("Signup")}>
                            <Text style={AuthStyles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {renderLoading()}
            {renderError()}
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});
export default Login;