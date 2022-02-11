// got code from
// https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemwriteasstringasyncfileuri-contents-options
// https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/

import I18n from 'i18n-js';
import { Alert, Share } from 'react-native';
import { firebaseGetAllItems } from '../../../firebase/items.firebase';
import { firebaseGetUserSettings } from '../../../firebase/settings.firebase';
import { ExportAdapter } from '../../../interfaces/adapters';
import { Item } from '../../../interfaces/item';

const exportJsonAdapter: ExportAdapter = {
  async exportData(): Promise<void> {
    try {
      const items: Item[] = await firebaseGetAllItems();
      const settings = await firebaseGetUserSettings();
      const toShare = {
        items,
        settings,
      };
      Share.share({
        message: JSON.stringify(toShare),
      });
    } catch (error) {
      console.error(`export error: ${error}`);
      Alert.alert(I18n.t('errorTitle'), I18n.t('exportError'), [{ text: 'OK' }]);
    }
  },
};

export default exportJsonAdapter;
