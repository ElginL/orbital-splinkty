import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signUpHandler = () => {
        console.log("Some backend stuff goes here");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screenContainer}>
                <Text style={styles.headerText}>Sign Up Page</Text>
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
                    <TextInput
                        style={styles.input}
                        onChangeText={input => setConfirmPassword(input)}
                        placeholder="Confirm Password"
                        secureTextEntry
                    />
                    <Button
                        title="Sign Up"
                        onPress={signUpHandler}
                    />
                    <Button
                        title="Go back to sign in"
                        onPress={() => navigation.navigate("Login")}
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

export default Signup;