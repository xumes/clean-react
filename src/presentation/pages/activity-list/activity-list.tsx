import React, { useEffect, useState } from 'react'
import Styles from './activity-list-styles.scss'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { ActivittListItem, ActivityContext, ActivityError } from '@/presentation/pages/activity-list/components'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadActivityList: LoadActivityList
}

const ActivityList: React.FC<Props> = ({ loadActivityList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })
  const [state, setState] = useState({
    activities: [] as LoadActivityList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadActivityList.loadAll()
      .then(activities => setState({ ...state, activities }))
      .catch(error => {
        handleError(error)
      })
  }, [state.reload])

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
