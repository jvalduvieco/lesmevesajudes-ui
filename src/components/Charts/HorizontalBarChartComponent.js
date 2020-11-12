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

const sortData = (helps) => compose(
                                reverse,
                                sortBy(v => last(values(v))
                                ))(toPairs(helps))

const getLabels = (data) => map(v => prop(0,values(v)))(data)
const getValues = (data) => map(v => prop(1,values(v)))(data)


const HorizontalBarChart = ({data, title, prefix, labels}) => {

  const {t} = useTranslation('dashboard');

  const sortedData = sortData(data);

  const vals = {
    labels: labels ? labels : map(v => t(prefix + v))(getLabels(sortedData)),
    datasets: [{
      data: getValues(sortedData),
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
          <Typography headlineMapping='h3' color='textPrimary'>{t(title)}</Typography>
          <HorizontalBar data={vals} options={options}/>
         </Grid>
}

export default HorizontalBarChart;
