import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import exportAdapter from '../adapter/exportData/exportDataAdapter';
import importAdapter from '../adapter/importData/importDataAdapter';
import CalorieTargetDialog from '../components/CalorieTargetDialog';
import HorizontalLine from '../components/HorizontalLine';
import SettingsItem from '../components/SettingsItem';
import Spacer from '../components/Spacer';
import { LoadingContext } from '../contexts/LoadingContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { firebaseDeleteAccount, firebaseSignOut } from '../firebase/auth.firebase';
import { LoadingContextType, SettingsContextType } from '../interfaces/context';
import { SettingsNavigationProp } from '../navigation/types.navigation';

function SettingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<SettingsNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const { settings } = useContext<SettingsContextType>(SettingsContext);
  const [showCalorieTargetDialog, setShowCalorieTargetDialog] = useState<boolean>(false);

  const openLink = (link: string) => {
    try {
      Linking.openURL(link);
    } catch (error) {
      console.error('unable to open link');
    }
  };

  const signUserOut = async () => {
    try {
      await AsyncStorage.clear();
      await firebaseSignOut();
    } catch (error: any) {
      Alert.alert(I18n.t('errorTitle'), I18n.t(error.code), [{ text: 'OK' }]);
    }
  };

  const deleteUser = async () => {
    // TODO übersetzung hinzufügen
    showLoadingPopup(true, 'toAdd');
    try {
      await firebaseDeleteAccount();
      await AsyncStorage.clear();
      await firebaseSignOut();
      showLoadingPopup(false);
    } catch (error) {
      showLoadingPopup(false);
      console.error('deleteUser:', error);
    }
  };

  const deleteUserSecurityPopup = () => {
    Alert.alert(I18n.t('deleteUserDialogTitle'), I18n.t('deleteUserDialogMessage'), [
      { style: 'cancel', text: I18n.t('cancel') },
      { onPress: () => deleteUser(), style: 'destructive', text: I18n.t('delete') },
    ]);
  };

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View>
          {/* calorieTarget */}
          <SettingsItem
            left={I18n.t('calorieTarget')}
            right={settings?.calorieTarget ?? '2100'}
            onPress={() => {
              setShowCalorieTargetDialog(true);
            }}
          />

          {/* calorie requirements calculator */}
          <SettingsItem
            left={I18n.t('calorieRequirementCalculator')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('http://kalorienbedarf.de')}
          />

          {/* wight input */}
          <SettingsItem
            left={`${I18n.t('weight')} (KG)`}
            right={80}
            // TODO to implement
            onPress={() => alert('to implement')}
          />
          <HorizontalLine />

          {/* data export */}
          <SettingsItem
            left={I18n.t('exportData')}
            right={<Feather name="upload" size={24} />}
            onPress={() => exportAdapter.exportData()}
          />

          {/* data import */}
          <SettingsItem
            left={I18n.t('importData')}
            right={<Feather name="download" size={24} />}
            onPress={() => importAdapter.importData()}
          />

          {/* share */}
          <SettingsItem
            left={I18n.t('recommendApp')}
            right={<Feather name="share-2" size={24} />}
            onPress={() => Share.share({ message: 'https://xires.de' })}
          />
          <HorizontalLine />

          {/* privacy policy */}
          <SettingsItem
            left={I18n.t('privacyPolicy')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('https://xires.de')}
          />

          {/* terms of use */}
          <SettingsItem
            left={I18n.t('termsOfService')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('https://xires.de')}
          />

          {/* imprint */}
          <SettingsItem
            left={I18n.t('imprint')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('https://xires.de')}
          />
          <HorizontalLine />

          {/* change email */}
          <SettingsItem
            left={I18n.t('changeEmail')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => navigation.navigate('ChangeEmail')}
          />

          {/* change password */}
          <SettingsItem
            left={I18n.t('changePassword')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <HorizontalLine />

          {/* delete account */}
          <SettingsItem
            left={I18n.t('deleteAccount')}
            color={colors.notification}
            onPress={() => deleteUserSecurityPopup()}
          />

          {/* logout */}
          <SettingsItem left={I18n.t('logout')} onPress={() => signUserOut()} />
          <Spacer height={20} />
        </View>
      </ScrollView>

      {/* Dialogs */}
      <CalorieTargetDialog
        show={showCalorieTargetDialog}
        onClose={() => setShowCalorieTargetDialog(false)}
      />
    </>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    width: '100%',
  },
});
