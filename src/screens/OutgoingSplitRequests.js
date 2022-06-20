import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Text
} from 'react-native';
import { db, getCurrentUser } from '../firebase/loginAPI';
import {
    query,
    where,
    collection,
    onSnapshot
} from 'firebase/firestore';
import OutgoingSplitRequest from '../components/OutgoingSplitRequest';

const OutgoingSplitRequests = () => {
    const [outgoingRequests, setOutgoingRequests] = useState([]);

    useEffect(() => {
        const outgoingQuery = query(collection(db, "splitrequests"), where("from", "==", getCurrentUser()));

        const unsubOutgoingQuery = onSnapshot(outgoingQuery, snapshot => {
            const requests = [];
            snapshot.forEach(doc => {
                requests.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            setOutgoingRequests(requests);
        });

        return () => {
            unsubOutgoingQuery();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                outgoingRequests.length === 0
                    ? <Text style={styles.noRequestText}>No split requests, press + to create one</Text>
                    : (
                        <FlatList
                            keyExtractor={item => item.id}
                            data={outgoingRequests}
                            renderItem={({ item }) => (
                                <OutgoingSplitRequest item={item} />
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
        backgroundColor: 'white'
    },
    noRequestText: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 200,
        fontStyle: 'italic',
        color: 'grey'
    }
});

export default OutgoingSplitRequests;