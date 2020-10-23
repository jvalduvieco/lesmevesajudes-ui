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

const getHelpLabels = (sortedHelpsArray) => map(v => prop(0,values(v)))(sortedHelpsArray)
const getHelpValues = (sortedHelpsArray) => map(v => prop(1,values(v)))(sortedHelpsArray)

const AidChart = ({data}) => {
  const sorteHelps = sortHelps(data);
  const {t} = useTranslation('dashboard');

  const vals = {
    labels: getHelpLabels(sorteHelps),
    datasets: [
      {
        label: 'Ajudes',
        backgroundColor: '#eca1a6',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: getHelpValues(sorteHelps)
      }
    ]
  };

  return <Grid align='center' xs item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('aids')}</Typography>
          <HorizontalBar data={vals} />
         </Grid>
}

export default AidChart
