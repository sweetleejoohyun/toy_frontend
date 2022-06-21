import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {getPath} from "../../utils/user";
import defaultView from "../../utils/AppConfig"


// handle the private routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !getPath() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/image/'+defaultView}}
          />
        )
      }
    />
  );
}

export default PublicRoute;
