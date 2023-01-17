import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import UserContextProvider from './contexts/UserContext';
import AuthScreen from './screens/Auth';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
