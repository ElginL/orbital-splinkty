import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

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

export default AuthStack;