import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import { DatePicker } from "@material-ui/pickers";
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {FilterType} from './AidsDashboardTypes';
import {isNil} from 'ramda';
import {AIDS_DASHBOARD_FILTER} from './AidsDashboardReducer';

type Props = {
  aids: List<AidType>,
  //filter: FilterType,
  dispatch: any,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(5),
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

const initialFilterState = {
  active: true,
  date: new Date()
}

const FilterPanel = (props: Props) => {
  const [filter, setFilter] = useState(initialFilterState);
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  const {t} = useTranslation('dashboard');

  const handleFilter = (event) => {
    switch(event.target.id) {
    case 'active' :
      setFilter({
        ...filter,
        active: event.target.checked
      });
      break;
    case 'admin' :
      let adminValue = event.target.value;
      setFilter({
        ...filter,
        admin: adminValue === ''? null: adminValue
      });
      break;
    default:
        // do nothing
    }
  }

  useEffect(() => {
    props.dispatch({
      type: AIDS_DASHBOARD_FILTER,
      filter,
      selectedDate,
    })
  })

  return (
    <Paper elevation={2}>
      <FormControl className={classes.formControl}>
        <FormLabel>Activa</FormLabel>
        <Switch
          id="active"
          checked={filter.active}
          color="primary"
          onChange={handleFilter}/>

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

        <FormLabel>Administració</FormLabel>
        <RadioGroup className={classes.filterBlock} column value={filter.admin} onClick={handleFilter}>
          <FormControlLabel
            label='Totes'
            classes={{ label: classes.label }}
            control={<Radio id='admin' value={null} checked={isNil(filter.admin)} color='primary' size='small'/>} />
          <FormControlLabel
            label='Estatal'
            classes={{ label: classes.label }}
            control={<Radio id='admin' value='Estat' color='primary' size='small'/>} />
          <FormControlLabel
            label='Generalitat'
            classes={{ label: classes.label }} control={<Radio id='admin' value='Generalitat' color='primary' size='small'/>}/>
          <FormControlLabel
            label='Ajuntament'
            classes={{ label: classes.label }} control={<Radio id='admin' value='Ajuntament' color='primary' size='small'/>}/>
        </RadioGroup>

      </FormControl>
    </Paper>
    );
}

export default connect()(FilterPanel);
