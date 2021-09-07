import React from 'react'
import '@/presentation/styles/global.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import ActivityList from '@/presentation/pages/activity-list/activity-list'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={makeLogin} />
        <Route path='/' exact component={ActivityList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
