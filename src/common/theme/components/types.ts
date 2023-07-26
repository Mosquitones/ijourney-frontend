import { Components, Theme } from '@mui/material'

export type ThemeComponentTypes = Components<Omit<Theme, 'components'>>
