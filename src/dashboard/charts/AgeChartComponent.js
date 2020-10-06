import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys,
        values} from 'ramda';

const AgeChart = ({data}) => {
  const vals = {
    labels: keys(data),
    datasets: [{
      data: values(data),
      backgroundColor: ['#eca1a6','#bdcebe']
    }]
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>Edat</Typography>
          <Doughnut data={vals} />
         </Grid>
}

export default AgeChart;
