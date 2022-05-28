import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
} from '@env';

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Create user with email and password
const createUser = (email, password, confirmPassword) => {
    function PasswordMismatchException() {
        this.code = "auth/password-mismatch"
        this.message = "Passwords do not match!"
    }
    
    if (password !== confirmPassword) {
        throw new PasswordMismatchException();
    } else {
        return createUserWithEmailAndPassword(auth, email, password);
    }
}

// Log out currently logged in user
const logOutUser = () => {
    return signOut(auth);
}

// Log in with given email and password
function logInUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export { createUser, logInUser, logOutUser }