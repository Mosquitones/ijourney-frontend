export interface BackdropPropTypes {
  open: boolean
  onClick?: () => void
  color?:
    | 'inherit'
    | 'secondary'
    | 'primary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
}
