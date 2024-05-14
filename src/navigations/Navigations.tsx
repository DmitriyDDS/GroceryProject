import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroceryListScreen from '../screens/GroceryListScreen';

type RootStackParamList = {
  GroceryListScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="GroceryListScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GroceryListScreen" component={GroceryListScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigation;