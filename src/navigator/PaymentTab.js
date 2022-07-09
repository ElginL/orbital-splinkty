import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import PaySentHistory from '../screens/PaySentHistory';
import PayReceiveHistory from '../screens/PayReceiveHistory';

const PaymentTab = () => {
    const Tab = createMaterialTopTabNavigator();

    // In place to solve IOS first render bottom crop off bug.
    const [flipKey, setFlipKey] = useState(0);
    useEffect(() => {
        setFlipKey(1);
    }, []);

    return (
        <Tab.Navigator
            key={flipKey}
            screenOptions={{
                swipeEnabled: false
            }}>
            <Tab.Screen
                name="Receive History"
                component={PayReceiveHistory}
            />
            <Tab.Screen
                name="Payments History"
                component={PaySentHistory}
            />
        </Tab.Navigator>
    )
}

export default PaymentTab;