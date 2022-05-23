import { initializeApp } from 'firebase/app';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';

import getErrorMessage from './authErrorMessages';

const firebaseConfig = {
    apiKey: "AIzaSyAl-DfxbyTt4pEIeto_hbfVp8nxF-ikwjA",
    authDomain: "splinkty-8a9f7.firebaseapp.com",
    projectId: "splinkty-8a9f7",
    storageBucket: "splinkty-8a9f7.appspot.com",
    messagingSenderId: "1024868372034",
    appId: "1:1024868372034:web:698cfb54323af3809ea7db",
    measurementId: "G-D5Y0PQ4695"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Create user with email and password
const createUser = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                alert("Registration successful!"); 
                // TODO: auto login, redirect to home page
            })
            .catch(error => {
                getErrorMessage(error.code);
                // TODO: clear text input fields
            })
    }
}

// Sign out user
const logOutUser = () => {
    signOut(auth).then(() => {
        alert("You have logged out.");
        // TODO: redirect to login page
    })
    .catch(error => {
        getErrorMessage(error.code);
        // TODO: handle this somehow? strange to get an error here though
    })
}

// Log in user
const logInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            // TODO: redirect to homepage
        })
        .catch((error) => {
            getErrorMessage(error.code);
            // TODO: clear text input fields
        });
}

// logged in check, feel free to delete
const loggedincheck = () => {
    const user = auth.currentUser;
    console.log(user ? true : false);
}


export { createUser, logInUser, logOutUser, loggedincheck }