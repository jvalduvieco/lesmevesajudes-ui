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

const AidChart = ({data}) => {
  const sorteHelps = sortHelps(data);
  const {t} = useTranslation('dashboard');

  const vals = {
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
  };

  const options= {
    legend:false,
    maintainAspectRatio: true
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('aids')}</Typography>
          <HorizontalBar data={vals} options={options}/>
         </Grid>
}

export default AidChart
