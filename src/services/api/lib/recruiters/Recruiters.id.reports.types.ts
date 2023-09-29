export interface CandidateReportTypes {
  name: string
  totalPoints: number
}

export interface RecruiterReportTypes {
  totalApplications: number
  totalApplicationsPercentage: number
  totalSelected: number
  totalSelectedPercentage: number
  totalRejected: number
  totalRejectedPercentage: number
  totalPending: number
  totalPendingPercentage: number
  totalHired: number
  totalHiredPercentage: number
  totalMasculineGender: number
  totalMasculineGenderPercentage: number
  totalFeminineGender: number
  totalFeminineGenderPercentage: number
  totalOtherGender: number
  totalOtherGenderPercentage: number
  candidates: CandidateReportTypes[]
}
