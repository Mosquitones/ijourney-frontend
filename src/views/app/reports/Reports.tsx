import React, { useState } from 'react'

import { TabContext, TabPanel } from '@mui/lab'
import { Container } from '@mui/material'
import dashboardImage from 'assets/images/app/reports/dashboard.png'

import { Banner } from 'components'

const TABS = [
  {
    value: 'db3796c0-3c5c-4820-88c8-8acbf3fa10f8',
    label: 'Gerais',
    content: 'Gerais',
  },
  {
    value: 'c6161324-2300-436a-9017-232029190680',
    label: 'Aplicações',
    content: 'Aplicações',
    disabled: true,
  },
  {
    value: '79242fd3-c2c7-4747-bfee-780b93a91852',
    label: 'Vagas',
    content: 'Vagas',
    disabled: true,
  },
  {
    value: '3aa3e3a1-df67-4f47-82d3-b8e600b6b69c',
    label: 'Ranking',
    content: 'Ranking',
    disabled: true,
  },
]

export default function ReportsPage() {
  const [selectedTab, setSelectedTab] = useState(TABS[0].value)

  return (
    <TabContext value={selectedTab}>
      <Banner.Container>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>Relatórios</Banner.Title>
          <Banner.Description>
            Procurando emprego? Pesquise nossas ultimas vagas abertas e aplique
            para as melhores oportunidades ainda hoje e bla bla boa!
          </Banner.Description>
        </Banner.Wrapper>
        <Banner.Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          aria-label='scrollable force tabs example'
        >
          {TABS.map((tab) => (
            <Banner.Tab key={tab.value} {...tab} />
          ))}
        </Banner.Tabs>
      </Banner.Container>
      <Container
        sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        {TABS.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            <img
              loading='lazy'
              src={dashboardImage}
              width='100%'
              height='auto'
              alt='aaa'
              style={{ userSelect: 'none' }}
            />
          </TabPanel>
        ))}
      </Container>
    </TabContext>
  )
}
