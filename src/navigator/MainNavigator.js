import React, { useState, useEffect } from 'react';
import AuthStack from './AuthStack';
import MainTab from './MainTab';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/loginAPI';

const MainNavigator = () => {
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        });
    
        return subscriber;
    }, []);

    return isAuth
        ? <MainTab />
        : <AuthStack />
}

export default MainNavigator;