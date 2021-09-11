import React from 'react'
import Icon, { IconName } from '@/presentation/components/icon/icon'

import Styles from './activity-item-styles.scss'

const ActivityItem: React.FC = () => {
  return (
    <li className={Styles.activityItemWrap}>
        <div className={Styles.activityContent}>
            <Icon iconName={IconName.proposalSigned} />
            <p className={Styles.activityDescription}>Xumes signed the proposal Test proposal</p>
        </div>
        <footer>
            <time>
                <span className={Styles.timeAgo}>1 day ago</span>
                <span className={Styles.dateTime}>September 2, 2021 @ 10:24:15 AM (ADT)</span>
            </time>
            <p>Action</p>
        </footer>
    </li>
  )
}

export default ActivityItem
