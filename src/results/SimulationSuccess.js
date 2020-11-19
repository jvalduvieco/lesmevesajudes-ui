import React from 'react';
import {Trans} from 'react-i18next';
import {Grid, withStyles} from '@material-ui/core';
import {AppFormContainer} from '../components/AppForms';
import {styles} from '../styles/theme';
import ShowMeOnceModal from '../components/ShowMeOnceModal'
import ResumePage from "./ResumePage";

const SimulationSuccessComponent = ({resultsData, persons, classes, simulationID, initialSimulationId, isShowSimulation, printSimulation, simulationData}) => (
  <AppFormContainer>
    {isShowSimulation &&
    <ShowMeOnceModal name='resultsModal'
                     title={<Trans i18nKey='ajudes_a_les_que_podria_optar'/>}>
      <Trans i18nKey='avis_ajudes_a_les_que_podria_optar'/>
    </ShowMeOnceModal>
  }

    <ResumePage persons={persons} residence={simulationData.residence} family={simulationData.family}/>
  </AppFormContainer>

);

export default withStyles(styles)(SimulationSuccessComponent);
