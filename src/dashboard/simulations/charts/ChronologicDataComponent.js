import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {keys, map, values} from 'ramda';
import {useTranslation} from 'react-i18next';

const ChronologicDataChart = ({totalSimuationsByMonth, recalculatedSimulationsByMonth}) => {

  const {t} = useTranslation('dashboard');

  const rand = () => Math.round(Math.random()*100)

  const vals = {
    //labels: ['Gener', 'Febrer', 'Març', 'April', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Decembre'],
    labels: keys(totalSimuationsByMonth),
    datasets: [
      {
        type: 'bar',
        label: 'Totals',
        backgroundColor: '#bdcebe',
        data: values(totalSimuationsByMonth),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Recalculades',
        backgroundColor: '#eca1a6',
        data: values(recalculatedSimulationsByMonth),
      },
    ],
  }


  /*const vals = {
  labels: ['Gener', 'Febrer', 'Març', 'April', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Decembre'],
  datasets: [
    {
      type: 'line',
      label: 'Total',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Recuperades',
      backgroundColor: '#bdcebe',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Recalculades',
      backgroundColor: '#eca1a6',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
}*/

  return <Grid align='center' item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('simulation_resultats')}</Typography>
          <Bar data={vals} />
         </Grid>
}

export default ChronologicDataChart;