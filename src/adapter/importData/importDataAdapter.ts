import { ImportAdapter } from '../../interfaces/adapters';
import importJsonAdapter from './jsonFile/importJsonAdapter';

const importAdapter: ImportAdapter = {
  async importData(): Promise<void> {
    importJsonAdapter.importData();
  },
};

export default importJsonAdapter;
