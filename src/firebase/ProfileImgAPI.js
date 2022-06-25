import { 
    storage, 
    getCurrentUser,
    db
} from "./loginAPI";
import {
    doc,
    updateDoc,
    getDocs,
    query,
    where,
    collection
} from "firebase/firestore"
import { 
    uploadBytes, 
    ref, 
    getDownloadURL, 
    deleteObject 
} from "firebase/storage";

const uploadImg = async uploadURI => {
    const response = await fetch(uploadURI);
    const blob = await response.blob();

    const storageRef = ref(storage);
    const ProfilePictureRef = ref(storageRef, "ProfilePictures/" + getCurrentUser());
    
    uploadBytes(ProfilePictureRef, blob)
        .then(async () => {
            await updateURLInFirebase();
            console.log("Success");
        });
}

const deleteProfileImg = async () => {
    const desertRef = ref(storage, "ProfilePictures/" + getCurrentUser() + "_200x200");

    try {
        if (desertRef !== undefined) {
            deleteObject(desertRef);
            await updateURLInFirebaseHelper("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateURLInFirebase = async () => {
    const ProfilePictureRef = ref(storage, "ProfilePictures/" + getCurrentUser() + "_200x200");

    try {
        const URL = await getDownloadURL(ProfilePictureRef);
        await updateURLInFirebaseHelper(URL);
    } catch (err) {
        console.log(err.message);
    }
}

const updateURLInFirebaseHelper = async (url) => {
    const q = query(collection(db, "users"), where("email", '==', getCurrentUser()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async document => {
        const userRef = doc(db, 'users', document.id);
        await updateDoc(userRef, {
            photoURL: url
        });
    })
}

export {
    uploadImg,
    deleteProfileImg
}