import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { LoginScreen } from '../pages/auth/LoginScreen';
import { CalendarScreen } from '../pages/calendar/CalendarScreen';
import { startChecking } from '../redux/actions/Auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch( startChecking() );
  }, [dispatch]);

  if( checking ) {
    return (<h5>Espere...</h5>);
  }

  return (
    <Router>
      <Switch>

        {/* <Route exact path="/login" component={ LoginScreen } /> */}
        <PublicRoute 
          exact 
          path="/login" 
          component={ LoginScreen } 
          isAuthenticated={ !!uid }  
        />
        
        {/* <Route exact path="/" component={ CalendarScreen } /> */}
        <PrivateRoute 
          exact 
          path="/" 
          component={ CalendarScreen }
          isAuthenticated={ !!uid }
        />
        
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}
