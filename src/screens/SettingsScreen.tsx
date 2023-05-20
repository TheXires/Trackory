import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Realm } from '@realm/react';
import * as Sharing from 'expo-sharing';
import React, { useContext, useState } from 'react';
import { Alert, Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import HorizontalLine from '../components/HorizontalLine';
import InputDialog from '../components/InputDialog';
import SettingsItem from '../components/SettingsItem';
import { LoadingContext } from '../contexts/LoadingContext';
import { i18n } from '../i18n/i18n';
import { RealmContext } from '../realm/RealmContext';
import { LoadingContextType } from '../types/context';
import { CustomError } from '../types/error';
import { ConsumedItem, Consumption, Item } from '../types/item';
import { Settings } from '../types/settings';
import { exportData, readAndValidate } from '../util/data';
import { findDuplicateConsumptions, findDuplicateItems } from '../util/duplications';

const { useRealm, useQuery } = RealmContext;

function SettingsScreen() {
  const { colors } = useTheme();
  const realm = useRealm();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const calorieTarget = useQuery<string>('Setting').filtered("key == 'calorieTarget'")[0];

  // TODO replace with reals settings
  const [settings, setSettings] = useState<Settings>({
    calorieTarget: 2000,
    weight: 84,
  });
  const [showCalorieTargetDialog, setShowCalorieTargetDialog] = useState<boolean>(false);
  const [showWeightDialog, setShowWeightDialog] = useState<boolean>(false);

  const items = useQuery<Item>('Item').sorted('name');
  const consumptions = useQuery<Consumption>('Consumption');

  const saveCalorieTarget = (newCalorieTarget: number | undefined) => {
    if (!newCalorieTarget || newCalorieTarget === calorieTarget) return;
    try {
      realm.write(() => {
        calorieTarget.value = newCalorieTarget.toString();
      });
    } catch (error) {
      console.error(error);
    }
    setShowCalorieTargetDialog(false);
  };

  const saveWeight = (newWeight: number | undefined) => {
    if (!settings || !newWeight || newWeight === settings.weight) return;
    setSettings({ ...settings, weight: newWeight });
    setShowWeightDialog(false);
  };

  const openLink = (link: string) => {
    try {
      Linking.openURL(link);
    } catch (error) {
      console.error('unable to open link');
    }
  };

  const dataExport = async () => {
    showLoadingPopup(true, 'exportData');
    try {
      if (!items || !consumptions) throw new Error('noDataToExport');
      await exportData(items, consumptions);
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

  const dataImport = async () => {
    showLoadingPopup(true, 'importData');
    try {
      const { consumptions: importedConsumptions, items: importedItems } = await readAndValidate();

      // check for duplicates
      if (findDuplicateItems(importedItems, items)) {
        throw new CustomError('duplicateItems');
      }

      realm.write(() => {
        importedItems.forEach((item) => {
          const newItem: Item = { ...item, _id: new Realm.BSON.ObjectId() };
          realm.create('Item', newItem);
        });
      });

      if (findDuplicateConsumptions(importedConsumptions, consumptions)) {
        throw new CustomError('duplicateItems');
      }

      realm.write(() => {
        importedConsumptions.forEach((consumption) => {
          const newConsumption: Consumption = {
            _id: new Realm.BSON.ObjectId(consumption._id),
            date: consumption.date,
            items: [],
          };
          consumption.items.forEach((item) => {
            const newItem: ConsumedItem = { ...item, _id: new Realm.BSON.ObjectId() };
            newConsumption.items.push(newItem);
          });
          realm.create('Consumption', newConsumption);
        });
      });

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

  const realmExport = async () => {
    showLoadingPopup(true, 'exportRealm');
    try {
      await Sharing.shareAsync(`file://${realm.path}`);
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
            right={calorieTarget.value}
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
            left={i18n.t('dataExport')}
            right={<Feather name="upload" size={24} />}
            onPress={dataExport}
          />

          <SettingsItem
            left={i18n.t('dataImport')}
            right={<Feather name="download" size={24} />}
            onPress={dataImport}
          />

          <SettingsItem
            left={i18n.t('realmExport')}
            right={<Feather name="database" size={24} />}
            onPress={realmExport}
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
        value={calorieTarget.value}
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
