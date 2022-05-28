import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';
import getErrorMessage from './authErrorMessages';
import {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
} from '@env';
import {
    getFirestore,
    addDoc,
    collection
} from "firebase/firestore";

// Firebase project configuration
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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
db.experimentalForceLongPolling = true;

// Create user with email and password
const createUser = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                alert("Registration successful!");
                
                addDoc(collection(db, "users"), {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                });
            })
            .catch(error => {
                console.log(error.message);
                getErrorMessage(error.code);
            })
    }
}

const logOutUser = () => {
    signOut(auth).then(() => {
        alert("You have logged out.");
    })
    .catch(error => {
        getErrorMessage(error.code);
    })
}

const logInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
        })
        .catch((error) => {
            getErrorMessage(error.code);
        });
};

const getCurrentUser = () => {
    if (auth != null) {
        return auth.currentUser.email;
    }

    return null;
};

const getCurrentUserUID = () => {
    console.log(auth.currentUser.uid);
}

export { createUser, logInUser, logOutUser, db, getCurrentUser }