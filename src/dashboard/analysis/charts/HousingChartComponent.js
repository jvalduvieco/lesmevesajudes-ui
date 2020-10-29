import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys, map, values} from 'ramda';
import {useTranslation} from 'react-i18next';

const HousingChart = ({data}) => {

  const {t} = useTranslation('dashboard');

  const vals = {
    labels: map(v => t('habitatge_' + v))(keys(data)),
    datasets: [{
      data: values(data),
      backgroundColor: ['#d6cbd3','#eca1a6','#bdcebe','#ada397','#e3eaa7','#c1946a','#92a8d1','#f7cac9','#d5e1df']
    }]
  };

  return <Grid align='center' item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('habitatge')}</Typography>
          <Doughnut data={vals} />
         </Grid>
}

export default HousingChart;
