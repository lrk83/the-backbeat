import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

//Components
import Navbar from './components/Navbar';

//Pages
import HomePage from './pages/HomePage';
import SkillPage from './pages/SkillPage';
import SoundPage from './pages/SoundPage';
import CommunityPage from './pages/CommunityPage';
import AccountPage from './pages/AccountPages/AccountPage';
import ContentPage from './pages/AccountPages/ContentPage';
import LoginPage from './pages/AccountPages/LoginPage';
import SignUpPage from './pages/AccountPages/SignUpPage';
import SingleSound from './pages/SingleSound';
import SingleSkill from './pages/SingleSkill';
import SingleUser from './pages/SingleUser';
import newSoundPostPage from './pages/AccountPages/NewSoundPost';
import newSkillPostPage from './pages/AccountPages/NewSkillPost';
import accountPreferences from './pages/AccountPages/AccountPreferences';

//ApolloClient
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

//App Structure
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path='/skills' component={SkillPage} />
            <Route exact path='/sounds' component={SoundPage} />
            <Route exact path='/community' component={CommunityPage} />
            <Route exact path='/account/profile' component={AccountPage} />
            <Route exact path='/account/content' component={ContentPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/account/sounds/new-sound' component={newSoundPostPage} />
            <Route exact path='/account/skills/new-skill' component={newSkillPostPage} />
            <Route exact path='/acount/preferences' component={accountPreferences} />
            <Route path="/sounds/single-sound/:soundId" component={SingleSound} />
            <Route path="/skills/single-skill/:skillId" component={SingleSkill} />
            <Route path="/users/single-user/:userId" component={SingleUser} />
          </Switch>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
