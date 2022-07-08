import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Theme from "./component/theme/Theme";
import Layout from "./component/layout/Layout";
import Main from "./view/Main";
import PrivateRoute from "./component/routes/PrivateRoute";
import PublicRoute from "./component/routes/PublicRoute";
import { getPath } from "./common/User";


function App() {
  return (
    <Theme>
      <BrowserRouter>
        { getPath() ? ( <PrivateRoute component={Layout} /> )
          : ( <PublicRoute path="/" component={Main} /> )}
      </BrowserRouter>
    </Theme>
  );
}

export default App;
