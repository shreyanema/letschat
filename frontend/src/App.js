import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';
import Welcome from './components/chatbox/Welcome';
//import Logout from './components/Authentication/logout';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Authentication/>} />
        <Route path="/Welcome" element={<Welcome/>} />
      </Routes>
      </Router>
    </div>   
  );
}

export default App;
