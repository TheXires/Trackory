// got code from
// https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemwriteasstringasyncfileuri-contents-options
// https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/

import { Alert, Platform, Share } from 'react-native';
import RNFS from 'react-native-fs';
import { firebaseGetAllConsumptions } from '../../../firebase/consumption.firebase';
import { firebaseGetAllItems } from '../../../firebase/items.firebase';
import { firebaseGetWeightHistory } from '../../../firebase/statistics.firebase';
import { ExportAdapter } from '../../../types/adapters';
import { CustomError } from '../../../types/error';
import { i18n } from '../../../util/translation';

const exportJsonAdapter: ExportAdapter = {
  async exportData(): Promise<void> {
    try {
      const items = (await firebaseGetAllItems(0)).updatedItems;
      const consumptions = await firebaseGetAllConsumptions();
      const weightHistory = await firebaseGetWeightHistory();
      const toShare = {
        consumptions,
        items,
        weightHistory,
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
        Alert.alert(i18n.t('exportedData'), i18n.t('androidDataExportSuccess'));
      }
    } catch (error: any) {
      console.error(`export error: ${error}`);
      throw new CustomError('exportError', error);
    }
  },
};

export default exportJsonAdapter;
