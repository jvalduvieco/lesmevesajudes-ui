import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys,
        values} from 'ramda';

const LaboralChart = ({data}) => {
  const vals = {
    labels: keys(data),
    datasets: [{
      label: 'Situacions',
      data: values(data),
      backgroundColor: '#eca1a6'
    }]
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>Situació laboral</Typography>
          <HorizontalBar data={vals} />
         </Grid>
}

export default LaboralChart;
