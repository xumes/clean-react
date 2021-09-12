import React from 'react'
import { render, screen } from '@testing-library/react'
import { ActivityItem } from '@/presentation/pages/activity-list/components'
import { mockActivityModel } from '@/domain/test'
import { IconName } from '@/presentation/components/icon/icon'

describe('ActivityItem component', () => {
  test('Should render with correct values', () => {
    const activity = mockActivityModel()
    activity.category = 'proposal-viewed'
    activity.duration = 10
    render(<ActivityItem activity={activity} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.proposalViewed)
    expect(screen.getByTestId('description')).toHaveTextContent(activity.description)
    expect(screen.getByTestId('duration')).toHaveTextContent('for 10 seconds')
    expect(screen.getByTestId('time-ago')).toHaveTextContent(activity.formattedDateTime)
    expect(screen.getByTestId('date-time')).toHaveTextContent(activity.createdDateTime.toUTCString())
    expect(screen.getByTestId('action-button')).toHaveTextContent('Action')
  })

  test('Should render with correct values', () => {
    const activity = mockActivityModel()
    activity.category = 'proposal-created'
    render(<ActivityItem activity={activity} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.proposalCreated)
    expect(screen.getByTestId('description')).toHaveTextContent(activity.description)
    expect(screen.getByTestId('duration')).toHaveTextContent('')
    expect(screen.getByTestId('time-ago')).toHaveTextContent(activity.formattedDateTime)
    expect(screen.getByTestId('date-time')).toHaveTextContent(activity.createdDateTime.toUTCString())
    expect(screen.getByTestId('action-button')).toHaveTextContent('Action')
  })

  test('Should render with correct values', () => {
    const activity = mockActivityModel()
    activity.category = 'proposal-approval-requested'
    render(<ActivityItem activity={activity} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.noIcon)
    expect(screen.getByTestId('description')).toHaveTextContent(activity.description)
    expect(screen.getByTestId('duration')).toHaveTextContent('')
    expect(screen.getByTestId('time-ago')).toHaveTextContent(activity.formattedDateTime)
    expect(screen.getByTestId('date-time')).toHaveTextContent(activity.createdDateTime.toUTCString())
    expect(screen.getByTestId('action-button')).toHaveTextContent('Action')
  })
})
