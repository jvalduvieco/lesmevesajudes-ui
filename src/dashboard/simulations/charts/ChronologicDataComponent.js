import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {map, prop, propIs} from 'ramda';
import {useTranslation} from 'react-i18next';

const ChronologicDataChart = ({totalSimuationsByMonth, recalculatedSimulationsByMonth}) => {

  const {t} = useTranslation('dashboard');

  const months = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre']
  const getValues = (data) =>  map(m => propIs(m) ? prop(m, data) : 0)(months)

  const vals = {
    labels: months,
    datasets: [
      {
        type: 'bar',
        label: 'Totals',
        backgroundColor: '#bdcebe',
        data: getValues(totalSimuationsByMonth),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Recalculades',
        backgroundColor: '#eca1a6',
        data : getValues(recalculatedSimulationsByMonth),
      },
    ],
  }

  return <Grid align='center' item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('simulation_resultats')}</Typography>
          <Bar data={vals} />
         </Grid>
}

export default ChronologicDataChart;
