import BillStack from './BillStack';
import FriendsStack from './FriendsStack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const MainTab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome 
                                name="home" 
                                color={color} 
                                size={size} 
                            />
                        )
                    }}
                />
                <Tab.Screen 
                    name="BillStack" 
                    component={BillStack}
                    options={{
                        tabBarLabel: 'Split Bill',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons 
                                name="cash" 
                                color={color} 
                                size={size} 
                            />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="FriendsStack" 
                    component={FriendsStack}
                    options={{
                        tabBarLabel: 'Friend List',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 
                                name="user-friends" 
                                color={color} 
                                size={size} 
                            />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Profile" 
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons 
                                name="human" 
                                color={color} 
                                size={size} 
                            />
                        )
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainTab;