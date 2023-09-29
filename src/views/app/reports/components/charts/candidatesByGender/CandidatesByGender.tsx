import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { CandidatesByGenderPropTypes } from './CandidatesByGender.types'

ChartJS.register(ArcElement, Tooltip, Legend)

export const CandidatesByGenderPieChart: React.FC<
  CandidatesByGenderPropTypes
> = ({
  totalFeminineGender = 0,
  totalMasculineGender = 0,
  totalOtherGender = 0,
}) => {
  const data = {
    labels: ['Homem', 'Mulher', 'Outros'],
    datasets: [
      {
        label: ' Cadastrados',
        data: [
          totalMasculineGender || 0,
          totalFeminineGender || 0,
          totalOtherGender || 0,
        ],
        backgroundColor: ['#5289C9', '#EB4A8A', '#F7CA0E'],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} />
}
