import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, getCurrentUser } from '../firebase/loginAPI';
import {
    query,
    where,
    collection,
    onSnapshot
} from 'firebase/firestore';
import SplitRequest from '../components/SplitRequest';

const SplitBill = ({ navigation }) => {
    const [incomingSplitRequests, setIncomingSplitRequests] = useState([]);

    useEffect(() => {
        const incomingSplitRequestsQuery = query(collection(db, "splitrequests"), where("to", "==", getCurrentUser()));
        const unsubQuery = onSnapshot(incomingSplitRequestsQuery, snapshot => {
            const requests = [];
            
            snapshot.forEach(doc => {
                requests.push({
                    ...doc.data(),
                    id: doc.id
                });
            })

            setIncomingSplitRequests(requests);
        }) 

        return () => {
            unsubQuery();
        }
    }, []);

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You need to give camera access in order to use this feature");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            // allowsEditing: true,
        });

        if (!result.cancelled) {
            // TODO: Send this uri to a program that returns back the scanned items.
            console.log(result.uri);
            setModalVisible(false);
            navigation.navigate("Scanned Items", {
                itemsDescription: ["Chicken Nuggets", "McSpicy", "Filet O' Fish", "Fries", "Tomyum Noodles"],
                prices: [7.20, 7.70, 5.80, 3.90, 2.40],
                quantities: [6, 1, 2, 1, 2]
            });
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true
        });

        if (!result.cancelled) {
            // TODO: Send this uri to a program that returns back the scanned items.
            console.log(result.uri);
            setModalVisible(false);
            navigation.navigate("Scanned Items", {
                itemsDescription: ["Chicken Nuggets", "McSpicy", "Filet O' Fish", "Fries", "Tomyum Noodles"],
                prices: [7.20, 7.70, 5.80, 3.90, 2.40],
                quantities: [6, 1, 2, 1, 2]
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.splitReqHeader}>
                Incoming Split Requests
            </Text>
            <FlatList
                keyExtractor={item => item.id}
                data={incomingSplitRequests}
                renderItem={({ item }) => (
                    <SplitRequest 
                        item={item}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    splitReqHeader: {
        fontSize: 24,
        fontWeight: '500'
    }
});

export default SplitBill;