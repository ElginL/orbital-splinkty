import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import PaymentTab from './PaymentTab';

const ProfileStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                name="PaymentsHistory"
                component={PaymentTab}
                options={{
                    title: "Payment History"
                }}
            />
        </Stack.Navigator>
    );
};

export default ProfileStack;