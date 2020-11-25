import React, { Fragment, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import {DatePicker} from "@material-ui/pickers";
import {makeStyles} from '@material-ui/core/styles';
import {SIMULATIONS_DASHBOARD_FILTER} from './SimulationsDashboardReducer';

type Props = {
  allResults: [],
  dispatch: any,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  aidCheckBox: {
    padding: 0,
    paddingLeft: 10,
    fontSize: 10,
  },
  label: {
       fontSize: '0.8em'
   },
  filterBlock : {
    paddingBottom: 10,
  },
  MuiTypography: {
    body1: {
      fontSize: 10,
    }
  }
}));

const FilterPanel = (props: Props) => {

  const classes = useStyles();
  //const {t} = useTranslation('dashboard');


  var currentDate = new Date()
  var currentYear = currentDate.getFullYear();

  const [fromDate, handleFromDateChange] = useState(new Date(currentYear + "-01-01"));
  const [untilDate, handleUntilDateChange] = useState(currentDate);

  useEffect(() => {
    props.dispatch({
      type: SIMULATIONS_DASHBOARD_FILTER,
      fromDate,
      untilDate,
    })
  })

  return (
    <Paper elevation={2}>
      <FormControl className={classes.formControl}>
        <FormLabel>Des de</FormLabel>
        <Fragment>
          <DatePicker
            id='month'
            className={classes.filterBlock}
            views={["year", "month"]}
            minDate={new Date(currentYear + "-01-01")}
            maxDate={currentDate}
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </Fragment>

        <FormLabel>Fins a</FormLabel>
        <Fragment>
          <DatePicker
            id='month'
            className={classes.filterBlock}
            views={["year", "month"]}
            minDate={new Date(currentYear + "-01-01")}
            maxDate={currentDate}
            value={untilDate}
            onChange={handleUntilDateChange}
          />
        </Fragment>
      </FormControl>
    </Paper>
    );
}

export default connect()(FilterPanel);
