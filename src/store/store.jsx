import { createStore ,combineReducers,applyMiddleware  } from 'redux' 
import authReducer from './reducers/authReducer';
import {thunk} from 'redux-thunk';
import otppageReducer from './reducers/otppageReducer';

const rootReducer = combineReducers({
    auth :authReducer,
    otppage : otppageReducer,

})

const store  = createStore(rootReducer, applyMiddleware(thunk))

export default store