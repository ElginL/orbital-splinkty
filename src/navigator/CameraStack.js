import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptOptions from '../screens/ReceiptOptions';
import ScannedItems from '../screens/ScannedItems';

const Stack = createNativeStackNavigator();

const CameraNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Receipt Options"
                component={ReceiptOptions}
            />
            <Stack.Screen
                name="Scanned Items"
                component={ScannedItems}
            />
        </Stack.Navigator>
    );
};

export default CameraNavigator; 