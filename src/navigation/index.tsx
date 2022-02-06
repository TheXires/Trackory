import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme } from '../theme/colors';
import AuthNavigator from './AuthNavigator';
import RootStackNavigator from './MainNavigator';

export default function Root() {
  const scheme = useColorScheme();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(false);

  useEffect(() => {
    const authListener = auth().onAuthStateChanged((user) =>
      setIsAuthorized(user != null),
    );
    return authListener;
  }, []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      {isAuthorized === false && <AuthNavigator />}
      {isAuthorized === true && <RootStackNavigator />}
    </NavigationContainer>
  );
}
