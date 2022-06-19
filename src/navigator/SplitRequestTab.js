import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomingSplitRequests from '../screens/IncomingSplitRequests';
import OutgoingSplitRequests from '../screens/OutgoingSplitRequests';

const SplitRequestTab = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Incoming Requests"
                component={IncomingSplitRequests}
            />
            <Tab.Screen
                name="Outgoing Requests"
                component={OutgoingSplitRequests}
            />
        </Tab.Navigator>
    )
};

export default SplitRequestTab;