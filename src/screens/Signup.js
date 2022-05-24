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
import { createUser } from '../firebase/loginAPI';
import HorizontalLine from '../components/HorizontalLine';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthStyles from '../styles/AuthStyles';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signUpHandler = () => {
        createUser(email, password, confirmPassword);
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
                            onPress={signUpHandler}>
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
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default Signup;