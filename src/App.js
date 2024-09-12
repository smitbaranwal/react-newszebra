import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <div className="App">
      

        <Router>
        <Navbar />
          <Switch>
          {/* <Route path="/:id" element={<News />} />             */}
          <Route path="/:category" ><News /></Route>
          

          {/* <Route exact path="/general" ><News category="general" /></Route> */}
          {/* <Route exact path="/business" element={<News category="business" />} />
          <Route exact path="/enterainment" element={<News category="entertainment" />} /> */}
          </Switch>
        </Router>

      {/* <News category="general" /> */}
    </div>
  );
}

export default App;
