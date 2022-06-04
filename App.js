import MainNavigator from './src/navigator/MainNavigation';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};