import React from 'react'
import { render, screen } from '@testing-library/react'
import ActivityList from '@/presentation/pages/activity-list/activity-list'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { ActivityModel } from '@/domain/models'

class LoadActivityListSpy implements LoadActivityList {
  callsCount = 0
  async loadAll (): Promise<ActivityModel[]> {
    this.callsCount++

    return []
  }
}

type SutTypes = {
  loadActivityListSpy: LoadActivityListSpy
}

const makeSut = (): SutTypes => {
  const loadActivityListSpy = new LoadActivityListSpy()
  render(<ActivityList loadActivityList={loadActivityListSpy} />)

  return {
    loadActivityListSpy
  }
}

describe('ActivityLit Component', () => {
  test('Should display 2 empty items on start', () => {
    makeSut()
    const activityList = screen.getByTestId('activity-list')

    expect(activityList.querySelectorAll('li:empty').length).toBe(2)
  })

  test('Should call LoadSurveyList', () => {
    const { loadActivityListSpy } = makeSut()

    expect(loadActivityListSpy.callsCount).toBe(1)
  })
})
