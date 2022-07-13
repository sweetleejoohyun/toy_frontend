import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {getPath} from "../../common/User";


// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        getPath() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/'}}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
