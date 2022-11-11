import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { LoadingContext } from '../contexts/LoadingContext';
import { i18n } from '../i18n/i18n';
import OfflineScreen from '../screens/OfflineScreen';
import { MyDarkTheme, MyLightTheme } from '../theme/colors';
import { LoadingContextType } from '../types/context';
import AuthNavigator from './AuthNavigator';
import RootStackNavigator from './MainNavigator';

export default function Root() {
  const scheme = useColorScheme();
  const netInfo = useNetInfo();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(false);
  const [offline, setOffline] = useState<boolean>(true);

  useEffect(() => {
    const authListener = auth().onAuthStateChanged((user) => setIsAuthorized(user != null));
    return authListener;
  }, []);

  useEffect(() => {
    setOffline(netInfo.isInternetReachable === false);
  }, [netInfo]);

  const checkConnection = async () => {
    showLoadingPopup(true, i18n.t('reconnect'));
    setTimeout(async () => {
      const connection = await NetInfo.fetch();
      setOffline(connection.isInternetReachable === false);
      showLoadingPopup(false);
    }, 1500);
  };

  if (offline) return <OfflineScreen onPress={checkConnection} />;

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      {isAuthorized ? <RootStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
