import React from 'react'
import '@/presentation/styles/global.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeActivityList } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { ApiContext } from '@/presentation/contexts'
// import PrivateRoute from '@/presentation/components/private-route/private-route'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={makeLogin} />
          <Route path='/' exact component={makeActivityList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
