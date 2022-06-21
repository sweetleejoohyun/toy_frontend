import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from "./App";
import Theme from "./component/theme/Theme";
import {BrowserRouter, Switch} from "react-router-dom";
import Main from "./view/Main";
import PublicRoute from "./component/routes/PublicRoute";
import PrivateRoute from "./component/routes/PrivateRoute";


ReactDOM.render(
  <Theme>
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path='/' component={Main}/>
        <PrivateRoute component={App} />
      </Switch>
    </BrowserRouter>
  </Theme>,

  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
