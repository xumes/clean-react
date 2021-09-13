import React from 'react'
import ActivityList from '@/presentation/pages/activity-list/activity-list'
import { makeRemoteLoadActivityList } from '@/main/factories/usecases'

export const makeActivityList: React.FC = () => {
  return (
    <ActivityList
      loadActivityList={makeRemoteLoadActivityList()}
    />
  )
}
