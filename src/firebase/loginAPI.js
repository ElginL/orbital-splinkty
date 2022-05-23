import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';

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
const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log(userCredential);
        })
        .catch(error => {
            console.log(error.message);
        })
}

// Sign out user
const signOutUser = () => {
    signOut(auth).then(() => {
        // todo: Sign-out successful
    })
    .catch(error => {
        // todo: an error happened
    })
}

// Gets the current user who is signed in.
const isLoggedIn = () => {
    const user = auth.currentUser

    return user 
        ? true 
        : false;
}

// Sign in user
const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log(userCredential.user);
        })
        .catch(error => {
            console.log(error.message);
        })
};

export { createUser, isLoggedIn }