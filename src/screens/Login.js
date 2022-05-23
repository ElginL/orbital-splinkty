import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';   

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const signInHandler = () => {
        console.log("Backend goes here");
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
                        title="Sign In"
                        onPress={signInHandler}
                    />
                    <Button
                        title="Don't have an account? Click here to Sign Up"
                        onPress={() => navigation.navigate("Signup")}
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