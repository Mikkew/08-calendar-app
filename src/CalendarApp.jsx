import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { Provider } from "react-redux";
import Store from './redux/store/Store';

export const CalendarApp = () => {
  return (
    <Provider store={ Store }>
      <AppRouter/>
    </Provider>
  )
}
