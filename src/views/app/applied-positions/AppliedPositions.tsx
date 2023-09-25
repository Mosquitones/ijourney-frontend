/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import { Avatar, Typography, Divider, Container, Box } from '@mui/material'

import { Banner } from 'components'

import ArchiveTab from './tabs/archived/Archived'
import OnGoingTab from './tabs/on-going/OnGoing'
import SavedTab from './tabs/saved/Saved'

const TABS = [
  {
    value: '13b2f45e-8ee9-4d6e-8987-fbe6f2acdd22',
    label: 'Em andamento',
    content: <OnGoingTab />,
  },
  {
    value: 'e6e95c5e-aa89-4883-9aa4-0e0ae2464aa4',
    label: 'Arquivados',
    content: <ArchiveTab />,
  },
  {
    value: '3c084c1a-402c-43af-ba87-88ac541b8dd9',
    label: 'Salvos',
    content: <SavedTab />,
  },
]
export default function AppliedPositionsPage() {
  const [selectedTab, setSelectedTab] = useState(TABS[0].value)

  return (
    <TabContext value={selectedTab}>
      <Banner.Container>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>Vagas aplicadas</Banner.Title>
          <Banner.Description>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam
          </Banner.Description>
        </Banner.Wrapper>
        <Banner.Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
        >
          {TABS.map((tab) => (
            <Banner.Tab key={tab.value} {...tab} />
          ))}
        </Banner.Tabs>
      </Banner.Container>
      <Container sx={{ py: 6 }}>
        {TABS.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </Container>
    </TabContext>
  )
}
