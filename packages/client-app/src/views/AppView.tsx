import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Nav } from './components'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'

type AppViewProps = {}

export const AppView: FunctionComponent<AppViewProps> = () => (
    <BrowserRouter>
        <div className="c-app-view">
            <Nav />
            <Switch>
                <Route component={Landing} exact path="/" />
                <Route component={Login} exact path="/login" />
            </Switch>
        </div>
    </BrowserRouter>
)