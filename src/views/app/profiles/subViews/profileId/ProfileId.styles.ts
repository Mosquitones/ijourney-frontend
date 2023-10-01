import { Box, Avatar as MUIAvatar } from '@mui/material'
import styled from 'styled-components'

export const AvatarContainer = styled(Box)`
  --avatar-size: 15rem;
  --avatar-border-size: 1rem;
  --avatar-bottom-distance: calc((var(--avatar-size) / 1.79) * -1);

  padding: 0.8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.appBar};
`

export const Avatar = styled(MUIAvatar)`
  width: var(--avatar-size) !important;
  height: var(--avatar-size) !important;

  position: absolute;
  bottom: var(--avatar-bottom-distance);
  top: auto;

  background-color: ${({ theme }) => theme.palette.primary.main} !important;
  border: var(--avatar-border-size) solid
    ${({ theme }) => theme.palette.common.white} !important;
`

export const BehindSemiCircle = styled.div`
  --semi-circle-border-size: 0.2rem;
  --semi-circle-size: calc(var(--avatar-size) + var(--semi-circle-border-size));
  --semi-circle-bottom-distance: var(--semi-circle-size);
  position: absolute;
  top: auto;
  bottom: -0.1rem;

  border-radius: var(--avatar-size) var(--avatar-size) 0 0;

  width: var(--semi-circle-size) !important;
  height: calc(var(--semi-circle-size) / 2) !important;

  background-color: ${({ theme }) => theme.palette.divider};
`

export const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex-wrap: wrap;
`
