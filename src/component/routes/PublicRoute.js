import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  getPath,
  removePathSession
} from "../../common/User";


// handle the private routes
function PublicRoute({ component: Component, ...rest }) {
  if (rest.location.pathname === '/') {
    removePathSession();
  }
  return (
    <Route
      {...rest}
      render={props =>
        !getPath() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: rest.location.pathname}}
          />
        )
      }
    />
  );
}

export default PublicRoute;
