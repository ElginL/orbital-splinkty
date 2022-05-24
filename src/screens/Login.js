import React, { useState } from 'react';
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

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logInHandler = () => {
        logInUser(email, password);
    };

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
                            onPress={logInHandler}>
                            <Text style={AuthStyles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        <HorizontalLine />
                        <TouchableOpacity 
                            style={AuthStyles.blueBGBtn}
                            onPress={() => navigation.navigate("Signup")}>
                            <Text style={AuthStyles.buttonText}>Sign Up Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default Login;