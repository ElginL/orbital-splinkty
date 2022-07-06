import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
    query,
    where,
    doc,
    getDocs,
    collection,
    updateDoc
} from 'firebase/firestore';
import { db } from './loginAPI';

async function sendPushNotification(expoPushToken, title, body) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title,
        body,
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    })
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        return token;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            improtance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        });
    }
}

async function getToken() {
    const token = await registerForPushNotificationsAsync();

    return token;
}

async function deleteToken(userEmail) {
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async document => {
        const userRef = doc(db, "users", document.id);
        await updateDoc(userRef, {
            notifToken: null
        })
    })
};

export {
    sendPushNotification,
    registerForPushNotificationsAsync,
    getToken,
    deleteToken
}