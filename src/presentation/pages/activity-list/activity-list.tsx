import React, { useEffect, useState } from 'react'
import Styles from './activity-list-styles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { ActivittListItem, ActivityContext, ActivityError } from '@/presentation/pages/activity-list/components'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { ActivityModel } from '@/domain/models'

type Props = {
  loadActivityList: LoadActivityList
}

const ActivityList: React.FC<Props> = ({ loadActivityList }: Props) => {
  const [state, setState] = useState({
    activities: [] as ActivityModel[],
    error: ''
  })

  useEffect(() => {
    loadActivityList.loadAll()
      .then(activities => setState({ ...state, activities }))
      .catch(error => setState({ ...state, error: error.message }))
  }, [])

  return (
        <div className={Styles.activityListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Recent Activity</h2>
                <ActivityContext.Provider value={{ state, setState }}>
                  {state.error
                    ? <ActivityError />
                    : <ActivittListItem />
                  }
                </ActivityContext.Provider>
            </div>
            <Footer />
        </div>
  )
}

export default ActivityList
