import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import SignInPage from './components/SignInPage';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

function App() {
  const isLoggedIn = true; // or false, depending on your logic

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/SignInPage" component={SignInPage} />
        {isLoggedIn ? <Route path="/signup" component={SignUp} /> : null}
        {isLoggedIn ? <Route path="/profile" component={Profile} /> : null}
      </Switch>
    </BrowserRouter>
  );
}

export default App;