/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import { Avatar, Typography, Divider, Container, Box } from '@mui/material'
import { useQuery } from 'react-query'

import { Banner } from 'components'
import { useAuth } from 'contexts'
import { useParamsSelector } from 'hooks'
import { CandidateServices } from 'services'

import ArchiveTab from './tabs/archived/Archived'
import OnGoingTab from './tabs/on-going/OnGoing'
import SavedTab from './tabs/saved/Saved'

type TabTypes = {
  id: 'on-going' | 'archiveds' | 'saveds'
  label: string
  content: React.ReactNode
}

export default function AppliedPositionsPage() {
  const { userId } = useAuth()

  const params = useParamsSelector<'tab'>()

  const positionsQuery = useQuery({
    queryKey: [`/candidates/${userId}/positions`, { method: 'GET' }],
    queryFn: () => CandidateServices.id.positions.get(userId),
    enabled: params.get('tab') === 'on-going',
  })

  const archivedPositionsQuery = useQuery({
    queryKey: [`/candidates/${userId}/positions/archived`, { method: 'GET' }],
    queryFn: () => CandidateServices.id.positions.archived.get(userId),
    enabled: params.get('tab') === 'archiveds',
  })

  const savedPositionsQuery = useQuery({
    queryKey: [`/candidates/${userId}/positions/saved`, { method: 'GET' }],
    queryFn: () => CandidateServices.id.positions.saved.get(userId),
    enabled: params.get('tab') === 'saveds',
  })

  const TABS: TabTypes[] = [
    {
      id: 'on-going',
      label: 'Em andamento',
      content: <OnGoingTab positions={positionsQuery.data} />,
    },
    {
      id: 'archiveds',
      label: 'Arquivados',
      content: <ArchiveTab archivedPositions={archivedPositionsQuery.data} />,
    },
    {
      id: 'saveds',
      label: 'Salvos',
      content: <SavedTab savedPositions={savedPositionsQuery.data} />,
    },
  ]

  const tabParam = params.get<TabTypes['id']>('tab')
  const selectedTab = tabParam || TABS[0].id

  const isSelectedTabOnGoingLoading =
    positionsQuery.isLoading && selectedTab === TABS[0].id

  const isSelectedTabArchivedLoading =
    archivedPositionsQuery.isLoading && selectedTab === TABS[1].id

  const isSelectedTabSavedLoading =
    savedPositionsQuery.isLoading && selectedTab === TABS[2].id

  const isLoading =
    isSelectedTabOnGoingLoading ||
    isSelectedTabArchivedLoading ||
    isSelectedTabSavedLoading

  useEffect(() => {
    if (!tabParam) {
      params.add({ key: 'tab', value: 'on-going' })
    }
  }, [params, tabParam])

  return (
    <TabContext value={selectedTab}>
      <Banner.Container isLoading={isLoading}>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>
            {selectedTab === 'on-going' && 'Aplicações em andamento'}
            {selectedTab === 'archiveds' && 'Vagas arquivadas'}
            {selectedTab === 'saveds' && 'Vagas salvas'}
          </Banner.Title>
          <Banner.Description>
            Mantenha o controle das suas aplicações e visualize o status das
            vagas que você se candidatou. Sua jornada profissional está a um
            passo de se tornar realidade.
          </Banner.Description>
        </Banner.Wrapper>
        <Banner.Tabs
          value={selectedTab}
          onChange={(_, value) => {
            params.add({ key: 'tab', value })
          }}
        >
          {TABS.map((tab) => (
            <Banner.Tab {...tab} key={tab.id} value={tab.id} />
          ))}
        </Banner.Tabs>
      </Banner.Container>
      <Container sx={{ py: 6 }}>
        {TABS.map((tab) => (
          <TabPanel key={tab.id} value={tab.id}>
            {tab.content}
          </TabPanel>
        ))}
      </Container>
    </TabContext>
  )
}
