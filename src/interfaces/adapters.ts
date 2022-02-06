export interface ExportAdapter {
  /**
   * export data to external app or file
   */
  exportData(): Promise<void>;
}

export interface ImportAdapter {
  /**
   * export data to external app or file
   */
  importData(): Promise<void>;
}
