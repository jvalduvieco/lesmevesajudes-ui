import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys, map, values} from 'ramda';
import {useTranslation} from 'react-i18next';

const ViolenceChart = ({data}) => {

  const {t} = useTranslation('dashboard');

  const vals = {
    labels: map(v => t(v))(keys(data)),
    datasets: [{
      data: values(data),
      backgroundColor: ['#bdcebe','#eca1a6']
    }]
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>Violència gènere/domèstica</Typography>
          <Doughnut data={vals} />
         </Grid>
}

export default ViolenceChart;
