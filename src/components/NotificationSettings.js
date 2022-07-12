import React, { useEffect, useState } from 'react';
import { 
    StyleSheet,
    View,
    Switch,
    Text 
} from 'react-native';
import {
    query,
    where,
    doc,
    getDocs,
    collection,
    updateDoc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db, getCurrentUser } from '../firebase/loginAPI';

const NotificationSettings = () => {
    const notifTokens = useSelector(state => state.users.notificationTokens);
    const [isEnabled, setIsEnabled] = useState(notifTokens[getCurrentUser()] ? true : false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    useEffect(() => {
        const updateFirestore = async notificationOn => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", getCurrentUser()));
    
            const snapshot = await getDocs(q);
    
            snapshot.forEach(async document => {
                const docRef = doc(usersRef, document.id);
    
                await updateDoc(docRef, {
                    notificationOn
                });
            })
        }

        if (isEnabled) {
            updateFirestore(true).then(() => console.log("Notification on"));
        } else {
            updateFirestore(false).then(() => console.log("Notification off"));
        }
    }, [isEnabled]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Show Notifications</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    header: {
        fontSize: 20,
        marginRight: 10
    }
});

export default NotificationSettings;