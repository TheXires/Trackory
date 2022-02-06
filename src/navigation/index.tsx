import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AuthNavigator from './AuthNavigator';
import RootStackNavigator from './MainNavigator';
import auth from '@react-native-firebase/auth';

export default function Root() {
  const scheme = useColorScheme();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(false);

  useEffect(() => {
    const authListener = auth().onAuthStateChanged((user) => setIsAuthorized(user != null));
    return authListener;
  }, []);

  useEffect(() => {
    console.log('isAutorized:', isAuthorized);
  }, [isAuthorized]);

  return (
    <NavigationContainer>
      {isAuthorized === false && <AuthNavigator />}
      {isAuthorized === true && <RootStackNavigator />}
    </NavigationContainer>
  );
}
