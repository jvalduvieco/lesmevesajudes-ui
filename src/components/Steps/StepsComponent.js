//@flow
import React from 'react';
import {connect} from 'react-redux';
import {backStep, nextStep} from './StepsActions'
import {withStyles} from '@material-ui/core/styles';
import {Grid, Icon, Step, StepButton, Stepper} from '@material-ui/core';
import StepperButtons from './StepperButtons';
import Typography from '@material-ui/core/Typography';
import {Trans} from 'react-i18next';
import FaceIcon from '@material-ui/icons/Face';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import HomeIcon from '@material-ui/icons/Home';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const styles = theme => ({
  root: {
    width: '100%',
  },
  marginButtons: {
    marginBottom: 30 + 'px'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  buttonIcon: {
    smargin: theme.spacing.unit,
  },
  leftIcon: {
    marginLeft: theme.spacing.unit,
  },
  rightIcon: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    color: '#004A8E',
  }
});

type Props = {
  classes: Object,
  steps: Array,
  nextStep: Function,
  backStep: Function
}

const chooseIcon = (props,icon) => {
  switch(icon){
    case 'Persons':
    if(props.currentStep > 0){return <FaceIcon className={props.classes.completed}/>}
      return <FaceIcon/>
    case 'Family':
      if(props.currentStep > 1){return <PermContactCalendarIcon className={props.classes.completed}/>}
      return <PermContactCalendarIcon/>;
    case 'Home':
      if(props.currentStep > 2){return <HomeIcon className={props.classes.completed}/>}
      return <HomeIcon/>;
    case 'Help':
      if(props.currentStep >= 3){return <HelpOutlineIcon className={props.classes.completed}/>}
      return <HelpOutlineIcon/>;
    default: 
      break;
  }
}

let StepsComponent = (props: Props) => {
  const {classes, steps, currentStep, buttonEnabled, buttonVisible, backStep, nextStep} = props;
  const childComponent = steps[currentStep].component;
  return (
      <div className={classes.root}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((step) => {
            const labelProps = step.optional ? {
              optional: <Typography variant='caption'><Trans>Opcional</Trans></Typography>
            } : {};
            return <Step key={step}>
              <StepButton {...labelProps} icon={chooseIcon(props, step.icon)}>{step.label}</StepButton>
                   </Step>
          })
          }
        </Stepper>
        <Grid container>
          <Grid item sm={12} xs={12} md={12}>
            {childComponent}
          </Grid>
          <Grid item sm={12} xs={12} md={12} className={classes.backButton}>
            <StepperButtons nextAction={(currentStep === steps.length - 1) ? undefined : nextStep}
                            backAction={(currentStep === 0) ? undefined : backStep} classes={classes}
                            buttonEnabled={buttonEnabled} buttonVisible={buttonVisible}
                            nextIsResults={currentStep === steps.length - 2}/>
          </Grid>
        </Grid>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentStep: state.step.current_step,
    buttonEnabled: state.step.button_enabled,
    buttonVisible: state.step.button_visible

  }
};

export default connect(mapStateToProps, {nextStep, backStep})(withStyles(styles)(StepsComponent));
