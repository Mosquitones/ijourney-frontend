import { CandidateTypes } from 'services'

export const useCandidateMockData = () => {
  const data: CandidateTypes[] = [
    {
      id: 0,
      position: 1,
      name: 'John Doe',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 580,
    },
    {
      id: 1,
      position: 2,
      name: 'Brandon Gustavo',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 10,
    },
    {
      id: 2,
      position: 3,
      name: 'Myke Baguncinha',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 10,
    },
    {
      id: 3,
      position: 4,
      name: 'Renato Toguro',
      location: 'London',
      appliedAt: new Date(),
      timeSpent: 10,
      points: 10,
    },
  ]

  return data
}
