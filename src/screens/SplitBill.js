import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
import { db, getCurrentUser } from '../firebase/loginAPI';
import {
    query,
    where,
    collection,
    onSnapshot
} from 'firebase/firestore';
import CreateSplitRequestBtn from '../components/CreateSplitRequestBtn';
import SplitRequest from '../components/SplitRequest';
import HorizontalLine from '../components/HorizontalLine';

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

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Split Bill
                </Text>
                <CreateSplitRequestBtn 
                    style={styles.plusBtn}
                    navigation={navigation}
                />
            </View>
            <HorizontalLine />
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    header: {
        height: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500'
    },
    screenContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    splitReqHeader: {
        fontSize: 24,
        fontWeight: '500'
    }
});

export default SplitBill;