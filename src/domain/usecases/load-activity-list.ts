import { ActivityModel } from '@/domain/models'

export interface LoadActivityList {
  loadAll: () => Promise<ActivityModel[]>
}
