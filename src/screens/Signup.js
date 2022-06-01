import React, { useState } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HorizontalLine from '../components/HorizontalLine';
import AuthStyles from '../styles/AuthStyles';
import LoadingOverlay from '../components/LoadingOverlay';
import { ErrorPopup } from '../components/PopupDialogs';
import getErrorMessage from '../firebase/authErrorMessages';
import { addDoc, collection } from 'firebase/firestore';
import { createUser, db } from '../firebase/loginAPI';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signUpHandler = () => {
        setIsLoading(true);
        try {
            createUser(email, password, confirmPassword)
                .then(userCredential => {    
                    addDoc(collection(db, "users"), {
                        uid: userCredential.user.uid,
                        email: userCredential.user.email,
                    });
                })
                .catch((error) => {
                    signUpFailHandler(error);
                });
        } catch (error) {
            signUpFailHandler(error);
        }
        
    };

    const signUpFailHandler = (error) => {
        setIsLoading(false);
        setTimeout(() => setFailed(true), 400);
        setErrorMessage(getErrorMessage(error.code));
    }

    const renderLoading = () => {
        if (isLoading) {
            return <LoadingOverlay />;
        }
    }

    const renderError = () => {
        if (isFailed) {
            return <ErrorPopup errorMessage={errorMessage} setFailed={setFailed}/> 
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
                    <Text style={AuthStyles.headerTitle}>Sign Up</Text>
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
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default Signup;