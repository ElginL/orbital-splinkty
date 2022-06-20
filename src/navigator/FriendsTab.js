import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import FriendRequests from "../screens/FriendRequests";
import YourFriends from "../screens/YourFriends";

const FriendsTab = () => {
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
                name="Friends"
                component={YourFriends}
            />
            <Tab.Screen
                name="Friend Requests"
                component={FriendRequests}
            />
        </Tab.Navigator>
    )
}

export default FriendsTab;