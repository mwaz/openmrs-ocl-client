import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import store from './redux/reducers/store';
import './App.css';
import './components/dashboard/components/dictionary/styles/dictionary-modal.css';
import Login from './components/Login';
import Authenticate from './components/Auth';
import SourceSearch from './components/dashboard/container/SourceSearch';
import ConceptSearch from './components/dashboard/container/Concepts';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Authenticate(SourceSearch)} />
          <Route exact path="/dashboard/concepts" component={Authenticate(ConceptSearch)} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);
export default App;
