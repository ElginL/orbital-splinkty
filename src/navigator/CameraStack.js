import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptOptions from '../screens/ReceiptOptions';
import ScannedItems from '../screens/ScannedItems';
import ActiveGroup from '../screens/ActiveGroup';

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
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ActiveGroup")}>
                            <Text style={styles.continueText}>Next</Text>
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen
                name="ActiveGroup"
                component={ActiveGroup}
                options={{
                    title: "Select Members"
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    continueText: {
        fontSize: 18,
        color: 'rgb(10, 132, 255)'
    }
})

export default CameraNavigator; 