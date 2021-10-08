import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../scenes/home';
import Category from '../scenes/category';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
   return (
      <Tab.Navigator
         screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
         }}
      >
         <Tab.Screen
            name='Home'
            component={Home}
            options={{
               tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                     name={focused ? 'clipboard' : 'clipboard-outline'}
                     size={20}
                     color={color}
                  />
               ),
            }}
         />
         <Tab.Screen
            name='Category'
            component={Category}
            options={{
               tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                     name={focused ? 'file-tray' : 'file-tray-outline'}
                     size={20}
                     color={color}
                  />
               ),
            }}
         />
      </Tab.Navigator>
   );
};

export default Tabs;
