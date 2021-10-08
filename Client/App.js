import { NativeBaseProvider } from 'native-base';
import React from 'react';
import Tabs from './src/navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
   return (
      <NativeBaseProvider>
         <SafeAreaProvider>
            <NavigationContainer>
               <Stack.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName='Tabs'
               >
                  <Stack.Screen name='Tabs' component={Tabs} />
               </Stack.Navigator>
            </NavigationContainer>
         </SafeAreaProvider>
      </NativeBaseProvider>
   );
};

export default App;
