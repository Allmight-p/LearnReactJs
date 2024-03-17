import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {createStore,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import {Provider} from "react-redux"
import Home from './Components/HomeComponent';
import Coachregister from './Components/CoachRegisterComponent';
import CoachLogin from './Components/CoachLoginComponent';
import UserRegister from './Components/UserRegisterComponent';
import UserLogin from './Components/UserLoginComponent';
import CoachHome from './Components/CoachHomeComponent';
import CoachSchedules from './Components/CoachSchedulesComponent';
import RootReducer from './Reducers/RootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = applyMiddleware(thunk)(createStore)(RootReducer);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/coachregister" element={<Coachregister />} />
      <Route path="/coachlogin" element={<CoachLogin />} />
      <Route path='/usersignup' element={<UserRegister />} />
      <Route path='/userlogin' element={<UserLogin />} />
      <Route path='/coachhome' element={<CoachHome />} />
      <Route path='/coachschedules' element={<CoachHome />} />
      <Route path='/coachviewprofile' element={<CoachHome />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
