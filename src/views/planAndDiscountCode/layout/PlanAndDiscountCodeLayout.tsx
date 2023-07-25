import React from 'react'

import {
  LayoutComponent,
  TabComponent,
  TabsComponent,
  useTabs,
} from '@eduplaytion/numetry-ui-kit'
import { Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { RouteTypes } from 'router'

import { PlanAndDiscountCodeLayoutStyles } from './PlanAndDiscountCodeLayout.styles'

export default function PlanAndDiscountCodeLayout() {
  const { t: _ } = useTranslation()

  const tabs = useTabs<RouteTypes>([
    { label: '!#Plans', path: 'plans' },
    { label: '!#Discount codes', path: 'discount-codes' },
  ])

  return (
    <>
      <LayoutComponent
        header={{
          title: '!#Plans and Discount Codes',
          subtitle: '!#Manage the plans and discount codes.',
        }}
      >
        <PlanAndDiscountCodeLayoutStyles>
          <TabsComponent isStickedOnTop {...tabs.parent.props}>
            {tabs.children.map((tab) => (
              <TabComponent key={tab.value} {...tab} />
            ))}
          </TabsComponent>
          <Divider />
          <Outlet />
        </PlanAndDiscountCodeLayoutStyles>
      </LayoutComponent>
    </>
  )
}
