import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {useTranslation} from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  aids: List<AidType>,
  laboral: List<String>,
  selectedAids: [],
  closePanel:Function,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(5),
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

  return (
      <FormControl className={classes.formControl}>
      {props.aids &&

          <FormGroup className={classes.filterBlock}>
          <FormLabel>Ajudes</FormLabel>
              {props.aids.map((aid,index) => {
                return <FormControlLabel classes={{ label: classes.label }}  control={<Checkbox className={classes.aidCheckBox} value={aid.codi} color='primary' size='small'/>} label={aid.codi} /*label={<Typography variant="caption" color="textSecondary">{aid.codi}</Typography>}*/ value={aid.codi}/>
                })
              }
          </FormGroup>
        }

        <FormLabel>Sexe</FormLabel>
        <RadioGroup className={classes.filterBlock} row>
          <FormControlLabel classes={{ label: classes.label }} control={<Radio value='Dona' color='primary' size='small'/>} label='Dona' />
          <FormControlLabel classes={{ label: classes.label }} control={<Radio value='Home' color='primary' size='small'/>} label='Home' />
        </RadioGroup>

        {props.laborals &&
          <FormGroup className={classes.filterBlock}>
            <FormLabel>Situació laboral</FormLabel>
              {props.laborals.map((laboral,index) => {
                return <FormControlLabel classes={{ label: classes.label }} control={<Checkbox className={classes.aidCheckBox} value={laboral} color='primary' size='small'/>} label={t('laboral_' + laboral)} value={laboral}/>
                })
              }
          </FormGroup>
        }

        <FormLabel>Violencia</FormLabel>
        <RadioGroup className={classes.filterBlock} row>
          <FormControlLabel classes={{ label: classes.label }} control={<Radio value='Si' color='primary' size='small' />} label='Si' />
          <FormControlLabel classes={{ label: classes.label }} control={<Radio value='No' color='primary' size='small' />} label='No' />
        </RadioGroup>

        <FormLabel>Escolarització</FormLabel>
        <RadioGroup className={classes.filterBlock} row>
          <FormControlLabel classes={{ label: classes.label }} control={<Radio value='Si' color='primary' size='small' />} label='Si' />
          <FormControlLabel classes={{ label: classes.label }} control={<Radio value='No' color='primary' size='small' />} label='No' />
        </RadioGroup>

        <Grid>
          <Button onClick={() => props.closePanel()}>Netejar</Button>
        </Grid>
      </FormControl>
    );
}

export default FilterPanel
