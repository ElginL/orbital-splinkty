import React, { useState } from 'react';
import { 
    Image,
    Keyboard,
    Text, 
    TextInput, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HorizontalLine from "../components/HorizontalLine";
import { ErrorPopup } from '../components/PopupDialogs';
import LoadingOverlay from '../components/LoadingOverlay';
import { logInUser } from '../firebase/loginAPI';
import getErrorMessage from '../firebase/authErrorMessages';
import AuthStyles from '../styles/AuthStyles';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setFailed] = useState(false);
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
        setTimeout(() => setFailed(true), 500);
        setErrorMessage(getErrorMessage(error.code));
    }

    const renderLoading = () => {
        if (isLoading) {
            return <LoadingOverlay />;
        }
    }

    const renderError = () => {
        if (isFailed) {
            return <ErrorPopup errorMessage={errorMessage} setFailed={setFailed}/>;
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
                            autoCapitalize='none'
                            autoComplete='off'
                            autoCorrect={false}
                        />
                        <TextInput
                            style={AuthStyles.textInput}
                            onChangeText={input => setPassword(input)}
                            placeholder="Enter your password"
                            secureTextEntry
                            autoCapitalize='none'
                            autoComplete='off'
                            autoCorrect={false}
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

export default Login;