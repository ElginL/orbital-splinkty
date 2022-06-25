import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { 
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from './src/firebase/loginAPI';
import MainNavigator from './src/navigator/MainNavigator';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  // Prefetch user profile image
  useEffect(() => {
    const unsubUserQuery = onSnapshot(collection(db, "users"), snapshot => {
      snapshot.docs.forEach(doc => {
        Image.prefetch(doc.data().photoURL);
      })
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