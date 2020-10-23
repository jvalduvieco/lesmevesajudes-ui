import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys, map, values} from 'ramda';
import {useTranslation} from 'react-i18next';

const LaboralChart = ({data}) => {

  const {t} = useTranslation('dashboard');

  const vals = {
    labels: map(v => t('laboral_' + v))(keys(data)),
    datasets: [{
      label: 'Situacions',
      data: values(data),
      backgroundColor: '#eca1a6'
    }]
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('laboral')}</Typography>
          <HorizontalBar data={vals} />
         </Grid>
}

export default LaboralChart;
