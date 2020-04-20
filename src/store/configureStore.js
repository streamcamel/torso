import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'

export default function configureStore() {
    return createStore(
        rootReducer,
        window.__REDUX__DEVTOOLS_EXTENSIONS__ && window.__REDUX__DEVTOOLS_EXTENSIONS__(),
        applyMiddleware(thunk)
    )
}