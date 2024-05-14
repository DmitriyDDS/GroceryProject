import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigation from './Navigations';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const user = true;

  return (
    <NavigationContainer >
      {user ? <AppNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default RootNavigator;