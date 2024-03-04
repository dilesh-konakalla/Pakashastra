// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
// import OtherPage from './components/OtherPage';
import Login from './components/login';
import User from './components/user';
function App() {
  return (
    <Router>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path ="/user" element={<User />} />
     </Routes>
    </Router>
  );
}

export default App;
