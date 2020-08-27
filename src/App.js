import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext'

const Home = lazy(() => import('./containers/HistoricChart'));
const LiveChart = lazy(() => import('./containers/LiveChart'));
const Header = lazy(() => import('./containers/Header'));

const App = () => {

  return <ThemeProvider>
    <Router>
      <Suspense fallback={<div className="Fallback-container" >Loading...</div>}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/live-chart' component={LiveChart} />
        </Switch>
      </Suspense>
    </Router>
  </ThemeProvider>
}

export default App;
