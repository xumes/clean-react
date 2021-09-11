import React, { useEffect } from 'react'
import Styles from './activity-list-styles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { ActivityItemEmpty } from '@/presentation/pages/activity-list/components'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'

type Props = {
  loadActivityList: LoadActivityList
}

const ActivityList: React.FC<Props> = ({ loadActivityList }: Props) => {
  useEffect(() => {
    (async function () {
      loadActivityList.loadAll()
    })()
  }, [])

  return (
        <div className={Styles.activityListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Recent Activity</h2>
                <ul data-testid="activity-list">
                    <ActivityItemEmpty />
                </ul>
            </div>
            <Footer />
        </div>
  )
}

export default ActivityList
