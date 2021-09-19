import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockAccountModel, mockActivityListModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import ActivityList from '@/presentation/pages/activity-list/activity-list'

class LoadActivityListSpy implements LoadActivityList {
  callsCount = 0
  activities = mockActivityListModel()

  async loadAll (): Promise<LoadActivityList.Model[]> {
    this.callsCount++

    return this.activities
  }
}

type SutTypes = {
  loadActivityListSpy: LoadActivityListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadActivityListSpy = new LoadActivityListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }} >
      <Router history={history} >
        <ActivityList loadActivityList={loadActivityListSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadActivityListSpy,
    history,
    setCurrentAccountMock
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

  test('Should render error on UnexpectedError', async () => {
    const loadActivityListSpy = new LoadActivityListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadActivityListSpy, 'loadAll').mockRejectedValueOnce(error)

    makeSut(loadActivityListSpy)

    await waitFor(() => screen.getByRole('heading'))

    expect(screen.queryByTestId('activity-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should logout user on AccessDeniedError', async () => {
    const loadActivityListSpy = new LoadActivityListSpy()
    jest.spyOn(loadActivityListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock, history } = makeSut(loadActivityListSpy)

    await waitFor(() => screen.getByRole('heading'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadActivityListSpy = new LoadActivityListSpy()
    jest.spyOn(loadActivityListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadActivityListSpy)

    await waitFor(() => screen.getByRole('heading'))

    fireEvent.click(screen.getByTestId('reload'))

    await waitFor(() => screen.getByRole('heading'))

    expect(loadActivityListSpy.callsCount).toBe(1)
  })
})
