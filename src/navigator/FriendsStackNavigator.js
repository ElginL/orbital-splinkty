import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import Friends from '../screens/Friends';
import FriendsSearchBar from '../components/FriendsSearchBar';

const Stack = createNativeStackNavigator();

const FriendsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Friends"
                component={Friends}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Search Friends")}>
                            <FontAwesome 
                                name="search" 
                                size={25} 
                                color="black"
                                style={{ marginRight: 10 }} 
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="Search Friends" 
                component={FriendsSearchBar} 
            />
        </Stack.Navigator>
    );
};

export default FriendsNavigator