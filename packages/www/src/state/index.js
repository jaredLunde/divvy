import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import divvy from './reducers'


let middleware = [thunkMiddleware]
if (__DEV__) {
  middleware = [
    // allows us to dispatch() functions
    ...middleware,
    createLogger()
  ]
}

export const store = createStore(divvy, applyMiddleware(...middleware))
export * from './actions'
if (__DEV__) store.subscribe(() => console.log(store.getState()))