import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {Grid, Typography} from '@material-ui/core';
import {compose,
        last,
        map,
        prop,
        reverse,
        sortBy,
        toPairs,
        values} from 'ramda';
import {useTranslation} from 'react-i18next';


const sortHelps = (helps) => compose(
                                reverse,
                                sortBy(v => last(values(v))
                                ))(toPairs(helps))

const getLabels = (data) => map(v => prop(0,values(v)))(data)
const getValues = (data) => map(v => prop(1,values(v)))(data)

const PersonsChart = ({data}) => {
  const sorteHelps = sortHelps(data);
  const {t} = useTranslation('dashboard');

  const vals = {
    labels: ['1 persona','2 persones','3 persones','4 persones','5 persones','6 persones'],
    datasets: [
      {
        label: 'Ajudes',
        backgroundColor: '#eca1a6',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [50, 100, 125, 75, 60, 30],
        barThickness: 15
      }
    ]
  };

  /*const vals = {
    labels: getLabels(sorteHelps),
    datasets: [
      {
        label: 'Ajudes',
        backgroundColor: '#eca1a6',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: getValues(sorteHelps),
        barThickness: 15
      }
    ]
  };*/

  const options= {
    legend:false,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  return <Grid align='center' item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('Per nº de persones')}</Typography>
          <HorizontalBar data={vals} options={options}/>
         </Grid>
}

export default PersonsChart
