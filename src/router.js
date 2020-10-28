import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './app'
import Login from './page/login'
import Nomatch from './page/nomatch/index'
import RouterConfig from './config/menuConfig'
import RouterAuth from './routerAuth'
export default class IRouter extends React.Component {
    render() {
        return ( 
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/404" component={Nomatch}></Route>
                        <Switch>
                            <RouterAuth config={RouterConfig}></RouterAuth>
                        </Switch>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
