// got code from
// https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemwriteasstringasyncfileuri-contents-options
// https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/

import I18n from 'i18n-js';
import { Share } from 'react-native';
import Toast from 'react-native-toast-message';
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
      Toast.show({
        type: 'error',
        text1: I18n.t('errorTitle'),
        text2: I18n.t('exportError'),
      });
      console.error(`export error: ${error}`);
    }
  },
};

export default exportJsonAdapter;
