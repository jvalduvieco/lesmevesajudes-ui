import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys, map, values} from 'ramda';
import {useTranslation} from 'react-i18next';

const SexChart = ({data}) => {

  const {t} = useTranslation('dashboard');

  const vals = {
    labels: map(v => t('sexe_' + v))(keys(data)),
    datasets: [{
      data: values(data),
      backgroundColor: ['#eca1a6','#bdcebe']
    }]
  };

  return <Grid align='center' item>
          <Typography headlineMapping='h3' color='textPrimary'>Sexe</Typography>
          <Doughnut data={vals} />
         </Grid>
}

export default SexChart;
