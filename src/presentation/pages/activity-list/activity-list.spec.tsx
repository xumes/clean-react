import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ActivityList from '@/presentation/pages/activity-list/activity-list'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { ActivityModel } from '@/domain/models'
import { mockActivityListModel } from '@/domain/test'
import { UnexpectedError } from '@/domain/errors'

class LoadActivityListSpy implements LoadActivityList {
  callsCount = 0
  activities = mockActivityListModel()

  async loadAll (): Promise<ActivityModel[]> {
    this.callsCount++

    return this.activities
  }
}

type SutTypes = {
  loadActivityListSpy: LoadActivityListSpy
}

const makeSut = (loadActivityListSpy = new LoadActivityListSpy()): SutTypes => {
  render(<ActivityList loadActivityList={loadActivityListSpy} />)

  return {
    loadActivityListSpy
  }
}

describe('ActivityLit Component', () => {
  test('Should display 2 empty items on start', async () => {
    makeSut()
    const activityList = screen.getByTestId('activity-list')

    expect(activityList.querySelectorAll('li:empty')).toHaveLength(2)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()

    await waitFor(() => activityList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadActivityListSpy } = makeSut()

    expect(loadActivityListSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render ActivityItem on success', async () => {
    makeSut()
    const activityList = screen.getByTestId('activity-list')
    await waitFor(() => activityList)

    expect(activityList.querySelectorAll('li.activityItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on failure', async () => {
    const loadActivityListSpy = new LoadActivityListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadActivityListSpy, 'loadAll').mockRejectedValueOnce(error)

    makeSut(loadActivityListSpy)

    await waitFor(() => screen.getByRole('heading'))

    expect(screen.queryByTestId('activity-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })
})
