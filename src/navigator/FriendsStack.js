import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import FriendsTab from './FriendsTab'
import FriendsSearchBar from '../screens/FriendsSearchBar';

const Stack = createNativeStackNavigator();

const FriendsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="FriendsTab"
                component={FriendsTab}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Add Friends")}>
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
                name="Add Friends" 
                component={FriendsSearchBar} 
            />
        </Stack.Navigator>
    );
};

export default FriendsStack;