// got code from
// https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemwriteasstringasyncfileuri-contents-options
// https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/

import RNFS from 'react-native-fs';
import I18n from 'i18n-js';
import { Alert, Platform, Share } from 'react-native';
import { firebaseGetAllItems } from '../../../firebase/items.firebase';
import { firebaseGetUserSettings } from '../../../firebase/settings.firebase';
import { ExportAdapter } from '../../../interfaces/adapters';
import { Item } from '../../../interfaces/item';

const exportJsonAdapter: ExportAdapter = {
  async exportData(): Promise<void> {
    try {
      const items: Item[] = (await firebaseGetAllItems(0)).updatedItems;
      const settings = await firebaseGetUserSettings();
      const toShare = {
        items,
        settings,
      };
      if (Platform.OS === 'ios') {
        const path = `${RNFS.DocumentDirectoryPath}/export-data-${Date.now()}.json`;
        await RNFS.writeFile(path, JSON.stringify(toShare), 'utf8');
        await Share.share({
          url: path,
        });
        await RNFS.unlink(path);
      } else {
        const path = `${RNFS.DownloadDirectoryPath}/data-export-${Date.now()}.json`;
        await RNFS.writeFile(path, JSON.stringify(toShare), 'utf8');
        Alert.alert(I18n.t('exportedData'), I18n.t('androidDataExportSuccess'));
      }
    } catch (error) {
      console.error(`export error: ${error}`);
      Alert.alert(I18n.t('errorTitle'), I18n.t('exportError'));
    }
  },
};

export default exportJsonAdapter;
