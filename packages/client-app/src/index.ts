import { hydrate, render } from 'react-dom'

import { AppView } from './views'

function renderApp(Component) {
    const root = document.getElementById('app-mount')
    const renderMethod = process.env.IS_SSR === 'true' ? hydrate : render
    return renderMethod(Component, root)
}

renderApp(AppView)