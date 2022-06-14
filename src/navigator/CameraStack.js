import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptOptions from '../screens/ReceiptOptions';
import ScannedItems from '../screens/ScannedItems';
import ActiveGroup from '../screens/ActiveGroup';
import SplitItems from '../screens/SplitItems';

const Stack = createNativeStackNavigator();

const NextButton = ({ navigation, location }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(location)}>
            <Text style={styles.continueText}>
                Next
            </Text>
        </TouchableOpacity>
    )
}

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
                        <NextButton 
                            navigation={navigation}
                            location="ActiveGroup"
                        />
                    )
                })}
            />
            <Stack.Screen
                name="ActiveGroup"
                component={ActiveGroup}
                options={({ navigation }) => ({
                    title: "Select Members",
                    headerRight: () => (
                        <NextButton
                            navigation={navigation}
                            location="SplitItems"
                        />
                    )
                })}
            />
            <Stack.Screen
                name="SplitItems"
                component={SplitItems}
                options={{
                    title: "Split Items"
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