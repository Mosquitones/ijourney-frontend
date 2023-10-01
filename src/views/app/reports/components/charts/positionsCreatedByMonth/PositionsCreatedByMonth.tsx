import React from 'react'

import { useTheme } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { PositionsCreatedByMonthPropTypes } from './PositionsCreatedByMonth.types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const _options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

export const PositionsCreatedByMonthBarChart: React.FC<
  PositionsCreatedByMonthPropTypes
> = ({ positionsCreatedByMonth = [] }) => {
  const theme = useTheme()

  const data = {
    labels: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    datasets: [
      {
        label: ' Vagas criadas',
        data: positionsCreatedByMonth,
        backgroundColor: [theme.palette.primary.main],
      },
    ],
  }

  return <Bar data={data} />
}
