import { 
    storage, 
    getCurrentUser, 
    setUserProfilePicture 
} from "./loginAPI";
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
        .then(async snapshot => {
            console.log("Success");
            await saveURLInAuthUser();
        });
}

const deleteProfileImg = async () => {
    const desertRef = ref(storage, "ProfilePictures/" + getCurrentUser());

    try {
        if (desertRef) {
            deleteObject(desertRef);
        }
    } catch (error) {
        console.log(error.message);
    }
}

const saveURLInAuthUser = async () => {
    const ProfilePictureRef = ref(storage, "ProfilePictures/" + getCurrentUser());
    
    try {
        const URL = await getDownloadURL(ProfilePictureRef);
        setUserProfilePicture(URL);
    } catch (err) {
        console.log(err.message);
    }
}

export {
    uploadImg,
    deleteProfileImg
}