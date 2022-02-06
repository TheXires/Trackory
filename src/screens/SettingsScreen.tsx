import { Feather } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useState } from 'react';
import { Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import CalorieTargetDialog from '../components/CalorieTargetDialog';
import HorizontalLine from '../components/HorizontalLine';
import SettingsItem from '../components/SettingsItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function SettingsScreen() {
  const { colors } = useTheme();

  // const { settings }: SettingsContextType = useContext(SettingsContext);
  // TODO Zeile löschen, wenn fertig
  const settings = { calorieTarget: 2100 };
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
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    // TODO to implement
    // alert('to implement');
    Share.share({ message: 'test nachricht' });
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
            // onPress={() => exportAdapter.exportData()}
            onPress={() => alert('to implement')}
          />

          {/* data import */}
          <SettingsItem
            left={I18n.t('importData')}
            right={<Feather name="download" size={24} />}
            // TODO to implement
            // onPress={() => importAdapter.importData()}
            onPress={() => alert('to implement')}
          />

          {/* share */}
          <SettingsItem
            left={I18n.t('recommendApp')}
            right={<Feather name="share-2" size={24} />}
            // TODO to implement
            onPress={() => Share.share({ message: 'Add Link here' })}
          />
          <HorizontalLine />

          {/* privacy policy */}
          <SettingsItem
            left={I18n.t('privacyPolicy')}
            right={<Feather name="chevron-right" size={24} />}
            // TODO to implement
            onPress={() => alert('implement')}
          />

          {/* terms of use */}
          <SettingsItem
            left={I18n.t('termsOfService')}
            right={<Feather name="chevron-right" size={24} />}
            // TODO to implement
            onPress={() => alert('implement')}
          />

          {/* imprint */}
          <SettingsItem
            left={I18n.t('imprint')}
            right={<Feather name="chevron-right" size={24} />}
            onPress={() => openLink('http://xires.de')}
          />
          <HorizontalLine />

          {/* delete account */}
          <SettingsItem
            left={I18n.t('deleteAccount')}
            color={colors.notification}
            onPress={() => deleteUser()}
          />

          {/* logout */}
          <SettingsItem left={I18n.t('logout')} onPress={() => signUserOut()} />
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
