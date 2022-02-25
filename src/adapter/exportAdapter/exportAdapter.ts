import { ExportAdapter } from '../../types/adapters';
import exportJsonAdapter from './exportAdapterCollection/exportJsonAdapter';

const exportAdapter: ExportAdapter = {
  async exportData(): Promise<void> {
    await exportJsonAdapter.exportData();
  },
};

export default exportAdapter;
