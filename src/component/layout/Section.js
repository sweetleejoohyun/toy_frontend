import React, {useMemo} from "react";
import {Route, Switch} from 'react-router-dom';
import {makeStyles, Paper} from "@material-ui/core";

import ROUTE from "../../utils/Route";

function Section() {
  const classes = useStyles();
  const routes = useMemo(() => ROUTE, [])

  return (
    <Paper className={classes.root}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            render={() => (
              <route.component/>
            )}
          />
        ))}
      </Switch>
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100vh - ${theme.base.headerHeight} - ${theme.base.footerHeight})`,
    display: "flex",
    justifyContent: "space-between",
  }
}))

export default Section;