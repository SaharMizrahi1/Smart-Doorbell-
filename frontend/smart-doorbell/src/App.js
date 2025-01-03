import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Router components
import './App.css';
import Welcome from './components/Welcome';
import Login from './components/Login';      // Import the Login component
import Register from './components/Register';  // Import the Signup component
import FamilyMemberUpload from './components/FamilyMemberUpload';  
import WelcomeBack from './components/WelcomeBack';

function App() {
  return (
<BrowserRouter>
      <div className="App">
        <Routes>
          {/* Define route for the Welcome page */}
          <Route path="/" element={<Welcome />} />
          
          {/* Define route for the Login page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  {/* Sign Up page */}
          <Route path="/FamilyMemberUpload" element={<FamilyMemberUpload />} />  {/* Sign Up page */}
          <Route path="/welcome-back" element={<WelcomeBack />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
