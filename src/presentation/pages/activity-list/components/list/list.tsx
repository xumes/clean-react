import React, { useContext } from 'react'
import { ActivityItem, ActivityItemEmpty, ActivityContext } from '@/presentation/pages/activity-list/components'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'

const List: React.FC = () => {
  const { state } = useContext(ActivityContext)

  return (
    <ul className="listWrap" data-testid="activity-list">
        {state.activities.length
          ? state.activities.map((activity: LoadActivityList.Model) => <ActivityItem key={activity.id} activity={activity} />)
          : <ActivityItemEmpty />
        }
    </ul>
  )
}

export default List
