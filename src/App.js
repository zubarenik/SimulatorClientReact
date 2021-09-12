// ** Router Import
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GroupAction } from './redux/actions'
import Router from './router/Router'

const App = props => {
    const auth = useSelector(state => state.auth)
    const isAuthenticated = !!auth.token

    useEffect(() => {
        if (isAuthenticated)
            GroupAction.find()
    }, [])
    return <Router />
}

export default App
