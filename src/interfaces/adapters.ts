export interface ExportAdapter {
  /**
   * export data to external app or file
   */
  exportData(): Promise<void>;
}
