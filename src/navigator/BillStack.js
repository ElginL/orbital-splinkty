import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveGroup from '../screens/ActiveGroup';
import BillVerification from '../screens/BillVerification';
import SplitBill from '../screens/SplitBill';
import ScannedItems from '../screens/ScannedItems';
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

const BillStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Split Bill"
                component={SplitBill}
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
                options={({ navigation }) => ({
                    title: "Split Items",
                    headerRight: () => (
                        <NextButton
                            navigation={navigation}
                            location="SplitBillVerification"
                        />
                    )
                })}
            />
            <Stack.Screen
                name="SplitBillVerification"
                component={BillVerification}
                options={{
                    title: "Bill Verification"
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

export default BillStack; 