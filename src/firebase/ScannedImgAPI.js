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
import { getType } from "@reduxjs/toolkit";

const uploadScannedImage = async uploadURI => {
    const response = await fetch(uploadURI);
    const blob = await response.blob();
    const storageRef = ref(storage);
    const ScannedPictureRef = ref(storageRef, "ScannedPictures/" + getCurrentUser());

    uploadBytes(ScannedPictureRef, blob)
        .then(async () => {})
        .catch(err => {
            console.log(err);
        });
}

const getScannedImage = async () => {
    try {
        const storageRef = ref(storage);
        const ScannedPictureRef = ref(storageRef, "ScannedPictures/" + getCurrentUser());
        const url = await getDownloadURL(ScannedPictureRef);
        return url;
    } catch (err) {
        console.log(err.message);
    }
}

const deleteScannedImage = async () => {
    const storageRef = ref(storage);
    const desertRef = ref(storageRef, "ScannedPictures/" + getCurrentUser());

    try {
        if (desertRef !== undefined) {
            deleteObject(desertRef);        }
    } catch (error) {
        console.log(error.message);
    }
}
const processImage = async () => {
    console.log("doing now")
    const funcurl = "https://asia-southeast1-splinkty-8a9f7.cloudfunctions.net/function-1";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: getCurrentUser() })
    }
    let details = [];
    const request = await fetch(funcurl, options)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; ++i) {
                details.push(data[i])
            }
        })
    return details;
}

export { uploadScannedImage, deleteScannedImage, getScannedImage, processImage }