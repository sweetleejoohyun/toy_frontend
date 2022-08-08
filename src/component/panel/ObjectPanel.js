import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import PropTypes from "prop-types";

import ObjectBox from "../box/ObjectBox";


function ObjectPanel(props) {
  const {objectArr} = props
  const classes = useStyles();

  const isNotEmpty = (object) => {
    return Object.keys(object).length !== 0;
  }

  return (
    <div className={classes.root}>
      <TableContainer className={classes.rootTable}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow className={classes.tableRow}>
              { isNotEmpty(objectArr) &&
                  objectArr.map((item, index) => (
                    isNotEmpty(item) && (
                      <TableCell key={index} className={classes.tableCell}>
                        <ObjectBox objectInfo={item} />
                      </TableCell>
                    )))
              }
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

ObjectPanel.prototype = {
  objectArr: PropTypes.array.isRequired
}

const useStyles = makeStyles(theme => ({
  root:{
    height: '100%',
  },
  rootTable:{
    height: '100%',
    display: 'flex',
    overflowY: 'auto',
  },
  table:{
    height: '100%',
  },
  tableRow:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  tableCell:{
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    borderBottom: theme.spacing(0),
    width: theme.spacing(25),
    height: theme.spacing(25)
  }


}));

export default ObjectPanel;