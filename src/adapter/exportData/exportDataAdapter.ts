import { ExportAdapter } from '../../interfaces/adapters';
import exportJsonAdapter from './jsonFile/exportJsonAdapter';

const exportAdapter: ExportAdapter = {
  async exportData(): Promise<void> {
    exportJsonAdapter.exportData();
  },
};

export default exportAdapter;
