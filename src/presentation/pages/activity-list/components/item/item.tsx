import React from 'react'
import Icon, { IconName } from '@/presentation/components/icon/icon'

import Styles from './item-styles.scss'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'

type Props = {
  activity: LoadActivityList.Model
}

const getIcon = (category: string): IconName => {
  switch (category) {
    case 'proposal-created':
      return IconName.proposalCreated
    case 'proposal-signed':
      return IconName.proposalSigned
    case 'proposal-viewed':
      return IconName.proposalViewed
    default:
      return IconName.noIcon
  }
}

const getDurationLabel = (activity: LoadActivityList.Model): string => {
  if (activity.category !== 'proposal-viewed') {
    return ''
  }

  return `for ${activity.duration} seconds`
}

const ActivityItem: React.FC<Props> = ({ activity }: Props) => {
  return (
    <li className={Styles.activityItemWrap}>
        <div className={Styles.activityContent}>
            <Icon iconName={getIcon(activity.category)} />
            <p data-testid="description" className={Styles.activityDescription}>
              {activity.description}
              <span data-testid="duration" className={Styles.activityDuration}>{getDurationLabel(activity)}</span>
            </p>
        </div>
        <footer>
            <time>
                <span data-testid="time-ago" className={Styles.timeAgo}>{activity.formattedDateTime}</span>
                <span data-testid="date-time" className={Styles.dateTime}>{activity.createdDateTime.toUTCString()}</span>
            </time>
            <p data-testid="action-button">Action</p>
        </footer>
    </li>
  )
}

export default ActivityItem
