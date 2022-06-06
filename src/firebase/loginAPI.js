import { initializeApp } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
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
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Firebase cloud storage
const storage = getStorage(app);

// Create user with email and password
const createUser = (email, password, confirmPassword) => {
    class PasswordMismatchException {
        constructor() {
            this.code = "auth/password-mismatch";
            this.message = "Passwords do not match!";
        }
    }
    
    if (password !== confirmPassword) {
        throw new PasswordMismatchException();
    } else {
        return createUserWithEmailAndPassword(auth, email, password);
    }
}

// Log in with given email and password
const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// Log out currently logged in user
const logOutUser = () => {
    return signOut(auth);
}

const getCurrentUser = () => {
    if (auth != null) {
        return auth.currentUser.email;
    }

    return null;
};

export { 
    createUser,
    logInUser, 
    logOutUser, 
    getCurrentUser,
    db,
    storage,
    auth
};