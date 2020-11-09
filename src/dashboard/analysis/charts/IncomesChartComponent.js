import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys, map, values} from 'ramda';
import {useTranslation} from 'react-i18next';

const IncomesChart = ({data}) => {

  const {t} = useTranslation('dashboard');

  const vals = {
    labels: ['Baix', 'Mig', 'Alt'],
    datasets: [{
      data: [2000, 1500, 200],
      backgroundColor: ['#d6cbd3','#eca1a6','#bdcebe']
    }]
  };

  /*
  const vals = {
    labels: map(v => t(v))(keys(data)),
    datasets: [{
      data: values(data),
      backgroundColor: ['#d6cbd3','#eca1a6','#bdcebe']
    }]
  };
  */

  return <Grid align='center' item>
          <Typography headlineMapping='h3' color='textPrimary'>Ingressos</Typography>
          <Doughnut data={vals} />
         </Grid>
}

export default IncomesChart;
