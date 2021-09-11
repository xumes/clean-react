import React from 'react'
import { render, screen } from '@testing-library/react'
import ActivityList from '@/presentation/pages/activity-list/activity-list'

const makeSut = (): void => {
  render(<ActivityList />)
}

describe('ActivityLit Component', () => {
  test('Should display 2 empty items on start', () => {
    makeSut()
    const activityList = screen.getByTestId('activity-list')

    expect(activityList.querySelectorAll('li:empty').length).toBe(2)
  })
})
