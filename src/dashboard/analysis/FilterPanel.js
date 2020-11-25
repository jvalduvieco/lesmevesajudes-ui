import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  aids: List<String>,
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
  //const {t} = useTranslation('dashboard');

  return (
    <Paper elevation={2}>
      <FormControl className={classes.formControl}>
      <FormLabel>Encara no hi ha filtres</FormLabel>

      {//props.aids &&
        //  <FormGroup className={classes.filterBlock}>
        //  <FormLabel>Ajudes</FormLabel>
        //     {props.aids.map((aid,index) => {
        //        return <FormControlLabel classes={{ label: classes.label }}  control={<Checkbox className={classes.aidCheckBox} value={aid.codi} color='primary' size='small'/>} label={aid} /* value must be processed value={aid.codi}*//>
        //        })
        //      }
        //  </FormGroup>
        }
      {/*
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
        */}
      </FormControl>
    </Paper>
    );
}

export default FilterPanel
