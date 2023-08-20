import { LoadingButtonProps } from '@mui/lab'
import { FontWeightKeyTypes } from 'common/styles'

export type ButtonPropTypes = LoadingButtonProps & {
  fontWeight?: FontWeightKeyTypes
  rounded?: boolean
}
