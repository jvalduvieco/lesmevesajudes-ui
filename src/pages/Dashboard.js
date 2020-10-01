import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import SimulationStoreClient from '../shared/SimulationStoreAPIClient';
import {retrieveAllSimulations} from '../results/FetchSimulationAction';

type Props = {
  simulations: any,
};

export const DashboardPage = props => {

  const [simulations,setSimulations] = useState([]);

  useEffect(() => {
    if (simulations.length == 0) {
      dispatch({
        type: GET_ALL_SIMULATIONS,
      })
      //const simulations = dispatch(retrieveAllSimulations();
      //setSimulations(simulations);
    }
  });



	return (<Grid></Grid>);
}

function mapStateToProps(state) {
  var props = {
	  simulations: state.simulations,
  };
  return props;
}

export default connect(mapStateToProps)(DashboardPage);
