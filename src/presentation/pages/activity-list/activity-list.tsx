import React, { useEffect, useState } from 'react'
import Styles from './activity-list-styles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { ActivityItem, ActivityItemEmpty } from '@/presentation/pages/activity-list/components'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { ActivityModel } from '@/domain/models'

type Props = {
  loadActivityList: LoadActivityList
}

const ActivityList: React.FC<Props> = ({ loadActivityList }: Props) => {
  const [state, setstate] = useState({
    activities: [] as ActivityModel[]
  })

  useEffect(() => {
    loadActivityList.loadAll()
      .then(activities => setstate({ activities }))
  }, [])

  return (
        <div className={Styles.activityListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Recent Activity</h2>
                <ul data-testid="activity-list">
                  {state.activities.length
                    ? state.activities.map((activity: ActivityModel) => <ActivityItem key={activity.id} activity={activity} />)
                    : <ActivityItemEmpty />
                  }
                </ul>
            </div>
            <Footer />
        </div>
  )
}

export default ActivityList
