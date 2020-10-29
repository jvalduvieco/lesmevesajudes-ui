import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {DatePicker} from "@material-ui/pickers";
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';

type Props = {
  allResults: [],
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
  const {t} = useTranslation('dashboard');

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Paper elevation={2}>
      <FormControl className={classes.formControl}>
        <FormLabel>Mes</FormLabel>
        <Fragment>
          <DatePicker
            id='month'
            className={classes.filterBlock}
            views={["year", "month"]}
            minDate={new Date("2020-01-01")}
            maxDate={new Date()}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Fragment>
      </FormControl>
    </Paper>
    );
}

export default FilterPanel
