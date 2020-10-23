import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys, map, values} from 'ramda';
import {useTranslation} from 'react-i18next';

const DisabledChart = ({data}) => {

  const {t} = useTranslation('dashboard');

  const vals = {
    labels: map(v => t(v))(keys(data)),
    datasets: [{
      data: values(data),
      backgroundColor: ['#bdcebe','#eca1a6']
    }]
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('discapacitat')}</Typography>
          <Doughnut data={vals} />
        </Grid>
}

export default DisabledChart;
