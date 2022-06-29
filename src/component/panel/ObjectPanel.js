import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import ObjectBox from "../box/ObjectBox";


function ObjectPanel() {
  const classes = useStyles();

  const temp = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  // const temp = [{},{},{},{}]

  return (
    <div className={classes.root}>
      <TableContainer className={classes.rootTable}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow className={classes.tableRow}>
              {temp.map((item, index) => (
                <TableCell key={index} className={classes.tableCell}>
                  <ObjectBox />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
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
  }


}));

export default ObjectPanel;