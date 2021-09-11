import React from 'react'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import Styles from './activity-list-styles.scss'
import { ActivityItemEmpty } from './components'

const ActivityList: React.FC = () => {
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
