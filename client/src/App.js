/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
/*
import React from 'react';
import logo from './assets/StLukesUniHospital.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Splash">
        <img src={logo} className="Splash-logo" alt="logo" />
        <h1>Welcome to St. Luke's Health Buddy</h1>
        <p>Loading...</p>
        <button>Click Me</button>
      </div>
    </div>
  );
}

export default App;
*/

// Import necessary modules from react-router-dom



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import logo from './StLukesUniHospital.jpg';
import './App.css';
import DiabetesEducation from './components/DiabetesEducation/DiabetesEducation.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/diabetes-education" element={<DiabetesEducation />} />
        </Routes>
      </div>
    </Router>
  );
}

function Splash() {
  return (
    <div className="Splash">
      <img src={logo} className="Splash-logo" alt="logo" />
      <h1>Welcome to St. Luke's Health Buddy</h1>
      <p>Loading...</p>
      <Link to="/diabetes-education"><button>Click Me</button></Link>
    </div>
  );
}

export default App;









