import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, 
    Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { logInUser, logOutUser, loggedincheck } from '../firebase/loginAPI';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const logInHandler = () => {
        console.log("Log in clicked!");
        return logInUser(email, password);
    }

    // should only appear after logging in (i.e. in homepage/settings page).
    // inserted here for testing purposes.
    const logOutHandler = () => {
        console.log("Log out clicked!");
        return logOutUser();
    }

    // for my own testing purposes feel free to delete
    const loggedin = () => {
        return loggedincheck();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screenContainer}>
                <Text style={styles.headerText}>Log In Page</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={input => setEmail(input)}
                        keyboardType="email-address"
                        placeholder="Enter your email address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={input => setPassword(input)}
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                    <Button
                        title="Log In"
                        onPress={logInHandler}
                    />
                    <Button
                        title="Don't have an account? Click here to Sign Up"
                        onPress={() => navigation.navigate("Signup")}
                    />
                    <Button
                        title="Log Out"
                        onPress={logOutHandler}
                    />
                    <Button
                        title="Logged In Test"
                        onPress={loggedin}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    },
    headerText: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 30
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: '70%',
        margin: 10
    },
    formContainer: {
        alignItems: 'center'
    }
});

export default Login;