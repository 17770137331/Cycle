import {createStore,applyMiddleware} from 'redux'
import reducer from '../reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
const configStore = ()=>createStore(reducer,composeWithDevTools())
export default configStore;