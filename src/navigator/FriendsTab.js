import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import FriendRequests from "../screens/FriendRequests";
import YourFriends from "../screens/YourFriends";

const FriendsTab = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: false
            }}>
            <Tab.Screen
                name="Friend Requests"
                component={FriendRequests}
            />
            <Tab.Screen
                name="Friends"
                component={YourFriends}
            />
        </Tab.Navigator>
    )
}

export default FriendsTab;