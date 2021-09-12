import React, { useContext } from 'react'
import { ActivityModel } from '@/domain/models'
import { ActivityItem, ActivityItemEmpty, ActivityContext } from '@/presentation/pages/activity-list/components'

const List: React.FC = () => {
  const { state } = useContext(ActivityContext)

  return (
    <ul className="listWrap" data-testid="activity-list">
        {state.activities.length
          ? state.activities.map((activity: ActivityModel) => <ActivityItem key={activity.id} activity={activity} />)
          : <ActivityItemEmpty />
        }
    </ul>
  )
}

export default List
