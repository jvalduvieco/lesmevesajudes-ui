import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {Grid,Typography} from '@material-ui/core';
import {compose,
        last,
        map,
        prop,
        reverse,
        sortBy,
        toPairs,
        values} from 'ramda';
import {useTranslation} from 'react-i18next';

const sortHousing = (helps) => compose(
                                reverse,
                                sortBy(v => last(values(v))
                                ))(toPairs(helps))

const getHousingLabels = (data) => map(v => prop(0,values(v)))(data)
const getHousingValues = (data) => map(v => prop(1,values(v)))(data)


const HousingChart = ({data}) => {

  const {t} = useTranslation('dashboard');

  const sortedHousing = sortHousing(data);

  const vals = {
    labels: map(v => t('habitatge_' + v))(getHousingLabels(sortedHousing)),
    datasets: [{
      data: getHousingValues(sortedHousing),
      backgroundColor: '#eca1a6',
      //barThickness: 15
    }]
  };

  const options= {
    legend:false,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        barThickness: 15,
      }]
    }

  };

  return <Grid align='center' item>
          <Typography headlineMapping='h3' color='textPrimary'>{t('habitatge')}</Typography>
          <HorizontalBar data={vals} options={options}/>
         </Grid>
}

export default HousingChart;
