import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import HorizontalLine from '../components/HorizontalLine';
import InputDialog from '../components/InputDialog';
import SettingsItem from '../components/SettingsItem';
import Spacer from '../components/Spacer';
import { LoadingContext } from '../contexts/LoadingContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { firebaseDeleteAccount, firebaseSignOut } from '../firebase/auth.firebase';
import { i18n } from '../i18n/i18n';
import { LoadingContextType, SettingsContextType } from '../types/context';
import { SettingsNavigationProp } from '../types/navigation';
import { exportUserData } from '../util/data';

function SettingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<SettingsNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const { settings, updateSettings } = useContext<SettingsContextType>(SettingsContext);
  const [showCalorieTargetDialog, setShowCalorieTargetDialog] = useState<boolean>(false);
  const [showWeightDialog, setShowWeightDialog] = useState<boolean>(false);

  const saveCalorieTarget = (newCalorieTarget: number | undefined) => {
    if (!settings || !newCalorieTarget || newCalorieTarget === settings?.calorieTarget) return;
    updateSettings({ ...settings, calorieTarget: newCalorieTarget });
    setShowCalorieTargetDialog(false);
  };

  const saveWeight = (newWeight: number | undefined) => {
    if (!settings || !newWeight || newWeight === settings?.weight) return;
    updateSettings({ ...settings, weight: newWeight });
    setShowWeightDialog(false);
  };

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
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  const deleteUser = async () => {
    showLoadingPopup(true, i18n.t('deleteAccount'));
    try {
      await firebaseDeleteAccount();
      await AsyncStorage.clear();
      await firebaseSignOut();
      showLoadingPopup(false);
    } catch (error: any) {
      console.error('deleteUser:', error);
      showLoadingPopup(false);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  const deleteUserSecurityPopup = () => {
    Alert.alert(i18n.t('deleteUserDialogTitle'), i18n.t('deleteUserDialogMessage'), [
      { style: 'cancel', text: i18n.t('cancel') },
      { onPress: () => deleteUser(), style: 'destructive', text: i18n.t('delete') },
    ]);
  };

  const exportData = async () => {
    showLoadingPopup(true, 'exportData');
    try {
      // TODO später einkommentieren
      // await exportAdapter.exportData();
      await exportUserData();
      showLoadingPopup(false);
    } catch (error: any) {
      console.error(error);
      showLoadingPopup(false);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View>
          {/* calorieTarget */}
          <SettingsItem
            left={i18n.t('calorieTarget')}
            right={settings?.calorieTarget ?? '2100'}
            onPress={() => {
              setShowCalorieTargetDialog(true);
            }}
          />

          {/* calorie requirements calculator */}
          <SettingsItem
            left={i18n.t('calorieRequirementCalculator')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('http://kalorienbedarf.de')}
          />

          {/* wight input */}
          <SettingsItem
            left={`${i18n.t('weight')} (${i18n.t('kilogramAbbreviation')})`}
            right={settings?.weight ?? '0'}
            onPress={() => setShowWeightDialog(true)}
          />
          <HorizontalLine />

          {/* data export */}
          <SettingsItem
            left={i18n.t('exportData')}
            right={<Feather name="upload" size={24} />}
            onPress={exportData}
          />

          {/* share */}
          <SettingsItem
            left={i18n.t('recommendApp')}
            right={<Feather name="share-2" size={24} />}
            onPress={() => Share.share({ message: 'https://xires.de' })}
          />
          <HorizontalLine />

          {/* privacy policy */}
          <SettingsItem
            left={i18n.t('privacyPolicy')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('https://xires.de')}
          />

          {/* terms of use */}
          <SettingsItem
            left={i18n.t('termsOfService')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('https://xires.de')}
          />

          {/* imprint */}
          <SettingsItem
            left={i18n.t('imprint')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('https://xires.de')}
          />
          <HorizontalLine />

          {/* change email */}
          <SettingsItem
            left={i18n.t('changeEmail')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => navigation.navigate('ChangeEmail')}
          />

          {/* change password */}
          <SettingsItem
            left={i18n.t('changePassword')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <HorizontalLine />

          {/* delete account */}
          <SettingsItem
            left={i18n.t('deleteAccount')}
            color={colors.notification}
            onPress={() => deleteUserSecurityPopup()}
          />

          {/* logout */}
          <SettingsItem left={i18n.t('logout')} onPress={() => signUserOut()} />
          <Spacer height={20} />
        </View>
      </ScrollView>

      {/* calorieTarget Dialogs */}
      <InputDialog
        headerText={i18n.t('dailyCalorieTarget')}
        onClose={() => setShowCalorieTargetDialog(false)}
        onSave={(newValue) => saveCalorieTarget(newValue)}
        placeholder="2100"
        show={showCalorieTargetDialog}
        text={i18n.t('dailyCalorieTargetQuestion')}
        value={settings?.calorieTarget}
      />
      {/* weight dialog */}
      <InputDialog
        headerText={i18n.t('currentWeightTitle')}
        onClose={() => setShowWeightDialog(false)}
        onSave={(newValue) => saveWeight(newValue)}
        placeholder="80"
        show={showWeightDialog}
        text={`${i18n.t('currentWeightTitleQuestion')} (in ${i18n.t('kilogramAbbreviation')})`}
        value={settings?.weight}
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
