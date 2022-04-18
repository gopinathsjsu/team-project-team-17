import {createStore} from 'redux'
import rootReducer from '../reducers'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
const store = createStore(rootReducer, storeEnhancers)

export default store