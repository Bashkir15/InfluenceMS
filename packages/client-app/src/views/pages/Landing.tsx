import React, { FunctionComponent } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

export type LandingProps = RouteChildrenProps & {}

export const Landing: FunctionComponent<LandingProps> = (props) => (
    <div className="p-landing">
        <p>Landing Page</p>
    </div>
)