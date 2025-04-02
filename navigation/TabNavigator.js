import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Favourites, List, Details } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { FONT_WEIGHT } from "../styles/GlobalStyles";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarBackground: () => <LinearGradient colors={["#1a1a2e", "#16213e"]} style={{ flex: 1 }} />,
                tabBarStyle: {
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    elevation: 0,
                    position: "absolute",
                    paddingBottom: 5,
                },
                tabBarIcon: ({ color, size, focused }) => {
                    const icons = {
                        Favourites: focused ? "heart" : "heart-outline",
                        List: focused ? "list" : "list-outline",
                    };
                    return <Ionicons name={icons[route.name]} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#4CAF50",
                tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: FONT_WEIGHT.bold,
                },
            })}
        >
            <Tab.Screen
                name="List"
                component={List}
                options={{
                    title: "List",
                }}
            />
            <Tab.Screen
                name="Favourites"
                component={Favourites}
                options={{
                    title: "My Exchange",
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
