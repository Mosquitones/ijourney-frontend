export interface PositionScorePropTypes {
  header?: {
    title?: string
    endAdornment?: React.ReactNode
  }

  minScore?: number
  currentScore?: number
  maxScore?: number
}
