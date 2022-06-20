import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomingSplitRequests from '../screens/IncomingSplitRequests';
import OutgoingSplitRequests from '../screens/OutgoingSplitRequests';

const SplitRequestTab = () => {
    const Tab = createMaterialTopTabNavigator();

        // In place to solve IOS first render bottom crop off bug.
        const [flipKey, setFlipKey] = useState(0);
        useEffect(() => {
            setFlipKey(1);
        }, []);

    return (
        <Tab.Navigator key={flipKey}>
            <Tab.Screen
                name="Incoming Requests"
                component={IncomingSplitRequests}
            />
            <Tab.Screen
                name="Outgoing Requests"
                component={OutgoingSplitRequests}
            />
        </Tab.Navigator>
    )
};

export default SplitRequestTab;