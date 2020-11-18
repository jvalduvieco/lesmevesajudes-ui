import {Grid, Typography, withStyles} from '@material-ui/core';
import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import {newDate} from '../shared/dateUtils';
import {styles} from '../styles/theme';
import BenefitRow, {NoBenefitRow} from './BenefitRow';

type UnitatDeConvivenciaBenefitsProps = {
  classes: Object,
  persons: Object,
  period: string,
  unitatDeConvivencia: Object,
};

const possibleBenefits = [
  {
    ID: 'HA_077_01',
    name: <Trans i18nKey='HA_077_01_title'>Prestacions econòmiques d'urgència social derivades de la mediació a
      Barcelona</Trans>,
    url: 'link_HA_077_01',
    amountText: <Trans i18nKey='HA_077_01_import'>Fins a 300 € /mes</Trans>,
    conditions: <Trans i18nKey='maxim_12_mesos'>Màxim 12 mesos</Trans>,
    from: newDate(2019, 2, 20),
    to: newDate(2019, 12, 5)
  },
  {
    ID: 'HG_077_02',
    name: <Trans i18nKey='HG_077_02_title'>Prestacions econòmiques d’especial urgència davant la pèrdua de l’habitatge
      per desnonament o execució hipotecària</Trans>,
    amountText: <Trans i18nKey='HG_077_02_import'>Fins a 200 € /mes</Trans>,
    conditions: <Trans i18nKey='maxim_12_mesos'>Màxim 12 mesos</Trans>,
    url: 'link_HG_077_02',
    from: undefined,
    to: undefined
  },
  {
    ID: 'HG_077_03',
    name: <Trans i18nKey='HG_077_03_title'>Prestacions econòmiques d’especial urgència per al pagament de quotes
      d'amortització hipotecària</Trans>,
    amountText: <Trans i18nKey='HG_077_03_import'>Fins a 3000 € /any</Trans>,
    conditions: <Trans i18nKey='pagament_unic'>pagament únic</Trans>,
    url: 'link_HG_077_03',
    from: undefined,
    to: undefined
  },
  {
    ID: 'HG_077_04',
    name: <Trans i18nKey='HG_077_04_title'>Prestacions econòmiques d’especial urgència per al pagament de deutes del
      lloguer</Trans>,
    amountText: <Trans i18nKey='HG_077_04_import'>Fins a 3000 € /any</Trans>,
    conditions: <Trans i18nKey='pagament_unic'>pagament únic</Trans>,
    url: 'link_HG_077_04',
    from: undefined,
    to: undefined
  },
  {
    ID: 'HG_077_04_01',
    name: <Trans i18nKey='HG_077_04_01_title'>Ajut complementari a les prestacions econòmiques d’especial urgència per
      al pagament de deutes del lloguer</Trans>,
    amountText: <Trans i18nKey='HG_077_04_01_import'>Fins a 200 € /mes</Trans>,
    conditions: <Trans i18nKey='maxim_12_mesos'>Màxim 12 mesos</Trans>,
    url: 'link_HG_077_04',
    from: undefined,
    to: undefined
  },
  {
    ID: 'HE_077_00',
    name: <Trans i18nKey='HE_077_00_title'>Subvencions de pagament de lloguer</Trans>,
    amountText: <Trans i18nKey='HE_077_00_import'>Fins a 200 € /mes</Trans>,
    conditions: <Trans i18nKey='maxim_12_mesos'>Màxim 12 mesos</Trans>,
    url: 'link_HE_077_00',
    from: newDate(2018, 5, 19),
    to: newDate(2018, 6, 29)
  },
];

const UnitatDeConvivenciaBenefits = (props: UnitatDeConvivenciaBenefitsProps) => {

  function hasAnyBenefit(unitatDeConvivencia, period) {
    return typeof unitatDeConvivencia === 'undefined'
        ? false
        : possibleBenefits.reduce((acc, benefit) => acc + unitatDeConvivencia[benefit.ID][period], 0) > 0;
  }

  function renderSingleBenefit(benefit, unitatDeConvivencia, period, classes: Object) {
    return unitatDeConvivencia[benefit.ID][period] > 0
        ? <Grid container className={classes.ResultPage} justify='center' alignItems='center' key={benefit.ID}>
          <BenefitRow benefit={benefit} subject={unitatDeConvivencia}/>
        </Grid>
        : null;
  }

  function renderUnitatDeConvivenciaBenefitList(unitatDeConvivencia, persons, period: string, classes: Object) {
    return (
          <Grid container justify='space-between'>
            {(hasAnyBenefit(unitatDeConvivencia, period))
                ? possibleBenefits.map((benefit) => renderSingleBenefit(benefit, unitatDeConvivencia, period, classes))
                : <NoBenefitRow/>}
          </Grid>
        );
  }

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item xs={12} sm={12}>
        <Grid className={props.classes.ResultItemResultOut}>
          <Typography variant='subtitle1' gutterBottom>
            <Trans i18nKey='ajudes_a_les_que_opta_habitatge'>Ajudes per a l'habitatge:</Trans>
          </Typography>
            {renderUnitatDeConvivenciaBenefitList(Object.values(props.unitatDeConvivencia)[0], props.persons, props.period, props.classes)}
        </Grid>
      </Grid>
    </Grid>
  )

}


export default withTranslation("translations")(withStyles(styles)(UnitatDeConvivenciaBenefits));
