import React from 'react'
import '@/presentation/styles/global.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
