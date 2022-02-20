// got code from
// https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemwriteasstringasyncfileuri-contents-options
// https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/

import I18n from 'i18n-js';
import { Alert, Platform, Share } from 'react-native';
import RNFS from 'react-native-fs';
import { firebaseGetAllConsumptions } from '../../../firebase/consumption.firebase';
import { firebaseGetAllItems } from '../../../firebase/items.firebase';
import { ExportAdapter } from '../../../interfaces/adapters';
import { CustomError } from '../../../interfaces/error';

const exportJsonAdapter: ExportAdapter = {
  async exportData(): Promise<void> {
    try {
      const items = (await firebaseGetAllItems(0)).updatedItems;
      const consumptions = await firebaseGetAllConsumptions();
      const toShare = {
        consumptions,
        items,
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
    } catch (error: any) {
      console.error(`export error: ${error}`);
      throw new CustomError('exportError', error);
    }
  },
};

export default exportJsonAdapter;
