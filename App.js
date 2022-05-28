import MainNavigator from './src/navigator/MainNavigation';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};