import React, { FunctionComponent } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

export type LoginProps = RouteChildrenProps & {}

export const Login: FunctionComponent<LoginProps> = (props) => (
    <div className="p-login">
        <p>Login Page</p>
    </div>
)