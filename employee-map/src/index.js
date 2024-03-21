import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Apitester from './Apitester';
import Useeffecttest from './Useeffecttest';
import Formtester from './Formtester';
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from './RegistrationForm';
import DeleteApiTester from './DeleteApiTester';
import AddDeleteEmployee from './AddDeleteEmp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App />
    {/* <Apitester /> 
    <Useeffecttest />
    <Formtester /> */}
    {/* <RegistrationForm /> */}
    {/* <DeleteApiTester /> */}
    {/* <AddDeleteEmployee /> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegistrationForm />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
