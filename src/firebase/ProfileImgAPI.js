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
    uploadBytesResumable, 
    ref, 
    getDownloadURL, 
    deleteObject 
} from "firebase/storage";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const defaultURL = async () => {
    const storageRef = ref(storage);

    const defaultPicRef = ref(storageRef, "ProfilePictures/" + "blank.png");
    const url = await getDownloadURL(defaultPicRef);

    return url;
}

const uploadImg = async uploadURI => {
    // Compress image before sending it for upload.
    const compressedResult = await manipulateAsync(
        uploadURI,
        [{ resize: { width: 200, height: 200 }}],
        { compress: 1, format: SaveFormat.JPEG }
    )

    const metadata = {
        contentType: 'image/jpeg'
    };

    const response = await fetch(compressedResult.uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `ProfilePictures/${getCurrentUser()}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on('state_changed', 
        snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log('Upload is ' + progress + '% done');
        },
        error => {
            console.log("Failed to upload image to firebase")
        },
        async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            
            await updateURL(url);
        })
}

const deleteProfileImg = async () => {
    const desertRef = ref(storage, "ProfilePictures/" + getCurrentUser());

    try {
        if (desertRef !== undefined) {
            deleteObject(desertRef);

            const url = await defaultURL(); 
            await updateURL(url);
            
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateURL = async url => {
    const q  = query(collection(db, "users"), where("email", "==", getCurrentUser()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async document => {
        const userRef = doc(db, "users", document.id);
        await updateDoc(userRef, {
            photoURL: url
        })
    })
}


export {
    uploadImg,
    deleteProfileImg,
    defaultURL
}