import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Styles from './activity-list-styles.scss'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { AccessDeniedError } from '@/domain/errors'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { ActivittListItem, ActivityContext, ActivityError } from '@/presentation/pages/activity-list/components'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  loadActivityList: LoadActivityList
}

const ActivityList: React.FC<Props> = ({ loadActivityList }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    activities: [] as LoadActivityList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadActivityList.loadAll()
      .then(activities => setState({ ...state, activities }))
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState({ ...state, error: error.message })
        }
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
