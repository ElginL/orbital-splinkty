import React, { useState, useEffect } from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Friends from '../screens/Friends';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Camera from '../screens/Camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const auth = getAuth();

const MainNavigator = () => {
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, user => {
        if (user) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }});
    
        return subscriber;
    }, []);

    const MainTab = () => {
        const Tab = createBottomTabNavigator();

        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Home" 
                        component={Home}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="home" color={color} size={size} />
                            )
                        }}
                    />
                    <Tab.Screen 
                        name="Camera" 
                        component={Camera}
                        options={{
                            tabBarLabel: 'Camera',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="camera" color={color} size={size} />
                            )
                        }} 
                    />
                    <Tab.Screen
                        name="Friends" 
                        component={Friends}
                        options={{
                            tabBarLabel: 'Friend List',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome5 name="user-friends" color={color} size={size} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Profile" 
                        component={Profile}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="human" color={color} size={size} />
                            )
                        }} 
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    };

    const AuthStack = () => {
        const Stack = createNativeStackNavigator();

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Login" 
                        component={Login} 
                        options={{
                            headerShown: false
                        }}    
                    />
                    <Stack.Screen 
                        name="Signup" 
                        component={Signup}
                        options={{
                            headerShown: false
                        }} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };

    if (!isAuth) {
        return <AuthStack />;
    } 
    
    return <MainTab />;
}

export default MainNavigator;