import React, { useEffect } from 'react';
import MainNavigator from './src/navigator/MainNavigator';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { LogBox, Image } from 'react-native';
import {
  onSnapshot,
  collection,
} from 'firebase/firestore';
import { db } from './src/firebase/loginAPI';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
  })
});

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  useEffect(() => {
    const unsubUserQuery = onSnapshot(collection(db, "users"), snapshot => {
      snapshot.docs.forEach(doc => {
          Image.prefetch(doc.data().photoURL);
      });
    });

    return () => {
      unsubUserQuery();
    }
  }, []);

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};