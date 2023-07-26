import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'

export interface FeedbackContextTypes {
  alert: {
    show: (
      message: SnackbarMessage,
      options?: OptionsObject | undefined
    ) => SnackbarKey
    showError: (error: string) => SnackbarKey
    showSuccess: (success: string) => SnackbarKey
  }
}

export interface SnackbarProviderPropTypes {
  disableProvider?: boolean
}
