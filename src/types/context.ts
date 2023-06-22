/**
 * Context for showing global loading spinner
 */
export interface LoadingContextType {
  showLoadingPopup: (isLoading: boolean, title?: string | undefined) => void;
}
