import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet
} from 'react-native';
import {
    onSnapshot,
    collection,
    query,
    where,
    orderBy
} from 'firebase/firestore';
import { db, getCurrentUser } from '../firebase/loginAPI';
import HistoryContact from '../components/HistoryContact';

const PayReceiveHistory = () => {
    const [history, setHistory] = useState({});

    useEffect(() => {
        const historyRef = collection(db, "payhistory");
        const historyQuery = query(
            historyRef,
            where("receiver", "==", getCurrentUser()),
            orderBy("timestamp", "desc")
        );

        const unsub = onSnapshot(historyQuery, snapshot => {
            const history = {};

            snapshot.forEach(doc => {
                const dateObj = doc.data().timestamp ? 
                    new Date(doc.data().timestamp.seconds * 1000)
                    : new Date();
                const dateStr = dateObj.toLocaleDateString();
                
                const hours = dateObj.getHours() < 10
                    ? "0" + dateObj.getHours().toString()
                    : dateObj.getHours().toString();
                const minutes = dateObj.getMinutes() < 10 
                    ? "0" + dateObj.getMinutes().toString() 
                    : dateObj.getMinutes().toString();
                const timeStr = hours + ":" + minutes;

                if (history[dateStr]) {
                    history[dateStr].push({
                        time: timeStr,
                        sender: doc.data().sender,
                        amount: doc.data().amount,
                        id: doc.id
                    })
                } else {
                    history[dateStr] = [{
                        date: dateStr,
                        time: timeStr,
                        sender: doc.data().sender,
                        amount: doc.data().amount,
                        id: doc.id
                    }]
                }
            });

            setHistory(history);
        });

        return () => {
            unsub();
        }
    }, []);

    return (
        <View style={styles.container}>
            {
                Object.keys(history).length === 0
                    ? <Text style={styles.noText}>No Payments Received Yet...</Text>
                    : (
                        <FlatList
                            keyExtractor={item => Math.random(1000)}
                            data={Object.keys(history)}
                            renderItem={({ item }) => (
                                <HistoryContact
                                    itemArr={history[item]}
                                    isReceived={true}
                                />
                            )}
                        />
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    noText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 100
    }
});

export default PayReceiveHistory;