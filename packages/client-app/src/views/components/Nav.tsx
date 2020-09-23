import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

export type NavProps = {}

export const Nav: FunctionComponent<NavProps> = () => (
    <nav className="c-nav">
        <div className="c-nav__links">
            <Link className="c-nav__link" to="/">Home</Link>
            <Link className="c-nav__link" to="/login">Login</Link>
        </div>
    </nav>
)