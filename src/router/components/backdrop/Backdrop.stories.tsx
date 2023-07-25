import React from 'react'

import { BackdropComponent } from './Backdrop'

export default {
  title: 'Backdrop',
  component: BackdropComponent,
}

export const Default = () => {
  const onClick = () => alert('Backdrop - onClick')
  return <BackdropComponent open onClick={onClick} />
}
