import React from 'react'

import { Fab, SvgIcon, Tooltip, Zoom, useTheme } from '@mui/material'

import { FloatingActionButtonPropTypes } from './FloatingActionButton.types'

export const FloatingActionButton: React.FC<FloatingActionButtonPropTypes> = ({
  icon,
  tooltip,
  color = 'primary',
  ...rest
}) => {
  const [isInTheScreen, setIsInTheScreen] = React.useState(true)
  const theme = useTheme()

  const transitionDuration = Object.freeze({
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  })

  return (
    <Zoom
      in={isInTheScreen}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${isInTheScreen ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Tooltip title={tooltip} placement='left'>
        <Fab
          {...rest}
          color={color}
          aria-label={tooltip}
          onClick={(e) => {
            if (rest.onClick) {
              setIsInTheScreen((cur) => !cur)
              rest.onClick(e)
            }
          }}
          sx={{
            ...rest.sx,
            position: 'fixed',
            bottom: 40,
            right: 16,
            top: 'auto',
            left: 'auto',
          }}
        >
          <SvgIcon
            component={icon}
            sx={{ color: ({ palette }) => palette.common.white }}
          />
        </Fab>
      </Tooltip>
    </Zoom>
  )
}
