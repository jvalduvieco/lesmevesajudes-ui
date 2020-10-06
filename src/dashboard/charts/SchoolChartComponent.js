import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys,
        values} from 'ramda';

const SchoolChart = ({data}) => {
  const vals = {
    labels: keys(data),
    datasets: [{
      data: values(data),
      backgroundColor: ['#bdcebe','#eca1a6']
    }]
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>Escolarització</Typography>
          <Doughnut data={vals} />
         </Grid>
}

export default SchoolChart;
