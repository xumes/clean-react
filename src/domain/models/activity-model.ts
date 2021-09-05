export type ActivityModel = {
  id: number
  userId: number
  createdDateTime: Date
  activityEventId: number
  personId?: number
  proposalId: number
  name: string
  description: string
  category: string
  proposalName: string
  paymentAmount: number
  clientName: string
  companyName: string
  activityUserName: string
  avatar: string
  message: string
  duration: number
  formattedDateTime: string
}
