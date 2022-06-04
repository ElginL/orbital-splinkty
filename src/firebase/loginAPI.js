import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    updateProfile
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

// Sets the authenticated user's photo URL (Profile picture).
const setUserProfilePicture = (photoURL) => {
    if (auth != null) {
        updateProfile(auth.currentUser, {
            photoURL
        }).then(() => {
            console.log("Profile updated!");
        }).catch(err => {
            console.log(err.message);
        })
    }
}

// Gets the authenticated user's photo URL.
const getUserProfilePicture = () => {
    if (auth != null) {
        return auth.currentUser.photoURL;
    }

    return "";
}

export { 
    createUser,
    logInUser, 
    logOutUser, 
    getCurrentUser,
    db,
    storage,
    setUserProfilePicture,
    getUserProfilePicture
};