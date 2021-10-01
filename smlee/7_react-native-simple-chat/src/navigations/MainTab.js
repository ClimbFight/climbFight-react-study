import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, ChannelList } from "../screens";
import { ThemeContext } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    const theme = useContext(ThemeContext);
    return(
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? theme.tabActiveColor : theme.tabInactiveColor }
         />
    );
};

const MainTab = () => {
    const theme = useContext(ThemeContext);
    return(
        <Tab.Navigator
            screenOptions={{
                activeTintColor: theme.tabActiveColor,
                inactiveTintColor: theme.tabInactiveColor,
                headerShown: false,
            }}
        >
            <Tab.Screen name="Channel List" component={ChannelList} options={{
                tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: focused? 'chat-bubble' : 'chat-bubble-outline'}),
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => TabBarIcon({focused, name: focused ? 'person': 'person-outline'})
            }} />
        </Tab.Navigator>
    );
};

export default MainTab;