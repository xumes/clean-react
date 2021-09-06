import React from 'react'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import Styles from './activity-list-styles.scss'

const ActivityList: React.FC = () => {
  return (
        <div className={Styles.activityListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Recent Activity</h2>
                <ul>
                    <li>
                        <div className={Styles.activityContent}>
                            <div className={Styles.iconWrap}>
                                <img className={Styles.icon} width="40px" src="https://e7.pngegg.com/pngimages/975/667/png-clipart-gray-eye-on-black-background-logo-circle-brand-angle-eye-icon-viewed-accomms-people-black.png"/>
                            </div>
                            <p className={Styles.activityDescription}>Xumes reviewed the proposal Test proposal</p>
                        </div>
                        <footer>
                            <time>
                                <span className={Styles.timeAgo}>2 days ago</span>
                                <span className={Styles.dateTime}>September 1, 2021 @ 10:24:15 AM (ADT)</span>
                            </time>
                            <p>Action</p>
                        </footer>
                    </li>
                </ul>
            </div>
            <Footer />
        </div>
  )
}

export default ActivityList
