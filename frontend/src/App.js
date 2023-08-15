import {BrowserRouter as Router, Routes, Route, json} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import PaymentSuccess from './components/PaymentSuccess';
import Home from './components/Home';
import './component.css'
import { useEffect, useState } from 'react';
const App = () => {


  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
