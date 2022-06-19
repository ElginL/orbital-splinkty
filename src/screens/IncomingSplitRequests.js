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
import IncomingSplitRequest from '../components/IncomingSplitRequest';

const IncomingSplitRequests = () => {
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
        <SafeAreaView style={styles.container}>
            {
                incomingSplitRequests.length === 0
                    ? <Text style={styles.noResultText}>No split requests, press + to create one</Text>
                    : (
                        <FlatList
                            keyExtractor={item => item.id}
                            data={incomingSplitRequests}
                            renderItem={({ item }) => (
                                <IncomingSplitRequest 
                                    item={item}
                                />
                            )}
                        />
                    )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    noResultText: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 200,
        fontStyle: 'italic',
        color: 'grey'
    },
});

export default IncomingSplitRequests;