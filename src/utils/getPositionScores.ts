import { RequirementTypes } from 'services'

export const getPositionScores = ({
  requirements,
}: {
  requirements: RequirementTypes[]
}) => {
  const minScore = requirements
    .sort((a, b) => a.points - b.points)
    .flatMap((requirement) => requirement.points)[0]

  const currentScore = requirements
    .filter((requirement) => requirement.done)
    .reduce((a, b) => a + b.points, 0)

  const maxScore = requirements.reduce((a, b) => a + b.points, 0)

  return {
    minScore,
    currentScore,
    maxScore,
  }
}
