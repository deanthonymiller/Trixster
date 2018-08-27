import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
// import NavTwo from './components/NavTwo/NavTwo'
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import SearchResults  from './components/SearchResults/SearchResults'
import IndQuestionPage from './components/IndQuestionPage/IndQuestionPage'
import MeetUps from './components/Meetups/MeetUps'
import IndMeetUp from './components/Meetups/IndMeetUp'
import './styles/main.css';

const App = () => (
  <div>
     <Router><Header /></Router>
    
    
    <Router>
    
      <Switch>
        <Redirect exact from="/" to="/home" />
        
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/search"
          component={SearchResults}
        />
        <Route
          path="/question/:id"
          component={IndQuestionPage}
        />
         <Route
          path="/meetup"
          component={MeetUps}
        />
         <Route
          path="/indMeetUp"
          component={IndMeetUp}
        />
        {/* OTHERWISE (no path!!!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
