import {combineReducers} from 'redux'
import coachReducer from './CoachReducer'

const RootReducer =  combineReducers({
        coachReducer,
})


export default RootReducer;