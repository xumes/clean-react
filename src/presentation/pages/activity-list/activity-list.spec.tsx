import React from 'react'
import { render, screen } from '@testing-library/react'
import ActivityList from '@/presentation/pages/activity-list/activity-list'

describe('ActivityLit Component', () => {
  test('Should display 2 empty items on start', () => {
    render(<ActivityList />)
    const activityList = screen.getByTestId('activity-list')

    expect(activityList.querySelectorAll('li:empty').length).toBe(2)
  })
})
