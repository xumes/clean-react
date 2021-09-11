import React from 'react'

import Styles from './activity-item-empty-styles.scss'

const ActivityItemEmpty: React.FC = () => {
  return (
    <>
        <li className={Styles.activityItemEmptyWrap}></li>
        <li className={Styles.activityItemEmptyWrap}></li>
    </>
  )
}

export default ActivityItemEmpty
