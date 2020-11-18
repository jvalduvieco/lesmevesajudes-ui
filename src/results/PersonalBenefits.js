import {Grid, Typography, withStyles} from '@material-ui/core';
import classNames from "classnames";
import React from 'react';
import {Trans, withTranslation} from 'react-i18next';
import Moment from 'moment';
import {styles} from "../styles/theme";
import {Person} from '../persons/PersonTypes';
import {newDate} from "../shared/dateUtils";
import BenefitRow, {NoBenefitRow} from './BenefitRow';

const possibleBenefits = [
  {
    ID: 'AE_230_mensual',
    name: <Trans i18nKey='AE_230_mensual_title'>Fons extraordinari d’ajuts d’emergència social per a infants de 0 a
      16 anys</Trans>,
    periode: <Trans i18nKey='mes'>mes</Trans>,
    conditions: <Trans i18nKey='maxim_8_mesos'>màxim 8 mesos</Trans>,
    url: 'link_AE_230',
    from: newDate(2019, 4, 25),
    to: newDate(2019, 5, 24)
  },
  {
    ID: 'AE_230_01_mensual',
    name: <Trans i18nKey='AE_230_01_mensual_title'>Fons extraordinari d’ajuts d’emergència social per a infants de 0
      a 16 anys per a famílies
      monoparentals</Trans>,
    periode: <Trans i18nKey='any'>any</Trans>,
    url: 'link_AE_230',
    from: newDate(2019, 4, 25),
    to: newDate(2019, 5, 24)
  },
  {
    ID: 'EG_233_mensual',
    name: <Trans i18nKey='EG_233_mensual_title'>Beques menjador escolar de Barcelona</Trans>,
    amountText: <Trans i18nKey='EG_233_mensual_amount'>Entre 3 - 6 €/dia</Trans>,
    url: 'link_EG_233',
    from: newDate(2018, 9, 3),
    to: newDate(2018, 9, 14)
  },
  {
    ID: 'GE_051_04_mensual',
    name: <Trans i18nKey='GE_051_04_mensual_title'>Renda activa d'inserció aturats de llarga durada</Trans>,
    periode: <Trans i18nKey='mes'>mes</Trans>,
    url: 'link_GE_051',
    from: undefined,
    to: undefined
  },
  {
    ID: 'GE_051_01_mensual',
    name: <Trans i18nKey='GE_051_01_mensual_title'>Renda activa d'inserció discapacitat 33%</Trans>,
    periode: <Trans i18nKey='mes'>mes</Trans>,
    url: 'link_GE_051'
  },
  {
    ID: 'GE_051_02_mensual',
    name: <Trans i18nKey='GE_051_02_mensual_title'>Renda activa d'inserció per a emigrants retornats</Trans>,
    periode: <Trans i18nKey='mes'>mes</Trans>,
    url: 'link_GE_051',
    from: undefined,
    to: undefined
  },
  {
    ID: 'GE_051_03_mensual',
    name: <Trans i18nKey='GE_051_03_mensual_title'>Renda activa d'inserció per a víctimes de violència de gènere o
      domèstica</Trans>,
    periode: <Trans i18nKey='mes'>mes</Trans>,
    url: 'link_GE_051',
    from: undefined,
    to: undefined
  },
  {
    ID: 'GG_270_mensual',
    name: <Trans i18nKey='GG_270_mensual_title'>Renda garantida ciutadana</Trans>,
    doNotShowAmount: true,
    url: 'link_GG_270',
    from: undefined,
    to: undefined,
  },
  {
    ID: 'GA_246_01',
    name: <Trans i18nKey='GA_246_01_title'>Targeta rosa</Trans>,
    url: 'link_GA_246',
    amountText: <Trans i18nKey='GA_246_01_import'>Gratuïta</Trans>,
    from: undefined,
    to: undefined
  },
  {
    ID: 'GA_246_02',
    name: <Trans i18nKey='GA_246_02_title'>Targeta rosa</Trans>,
    url: 'link_GA_246',
    amountText: <Trans i18nKey='GA_246_02_import'>Reduïda</Trans>,
    from: undefined,
    to: undefined
  },
  {
   ID: 'GA_234_01',
   name: <Trans i18nKey='GA_234_01_title'>Vincles</Trans>,
   url: 'link_GA_234',
   amountText: <Trans i18nKey='GA_234_01_import'>Gratuïta</Trans>,
   from: undefined,
   to: undefined
},
 {
  ID: 'GA_234_02',
  name: <Trans i18nKey='GA_234_02_title'>Vincles</Trans>,
  url: 'link_GA_234',
  amountText: <Trans i18nKey='GA_234_02_import'>Amb tauleta pròpia</Trans>,
  from: undefined,
  to: undefined
}
];
const period = Moment().format('YYYY-MM');

const PersonalBenefits = (props) => {

  function hasAnyBenefit(personWithBenefits) {
    if (typeof personWithBenefits === 'undefined') return false; //TODO hackish. this happends due some inconsistency in the request processing. On
    return (
        possibleBenefits.reduce((acc, benefit) => {
          return acc + personWithBenefits[benefit.ID][period];
        }, 0) > 0
    );
  }

  function renderAPersonalBenefit(benefit, personWithBenefits) {
    if (personWithBenefits[benefit.ID][period] > 0) {
      return (
          <BenefitRow benefit={benefit} subject={personWithBenefits} key={benefit.ID}/>
      );
    }
  }

  function renderPersonalBenefits(person: Person, personBenefits: any) {
    return (
        <Grid container className={classNames(props.classes.ResultItemResultOut, 'line-height-force')} direction='column' key={person.id}>
          <Typography variant='subtitle1' gutterBottom>
            <Trans i18nKey='ajudes_a_les_que_opta_persona'>Ajudes de les que podria ser
              beneficiàri/a:</Trans> <b>{person.nom}</b>
          </Typography>
          {(hasAnyBenefit(personBenefits))
              ? possibleBenefits.map(benefit => renderAPersonalBenefit(benefit, personBenefits))
              : <NoBenefitRow/>
          }
        </Grid>
    );
  }

  return (
        <Grid>
          {props.persons
              .valueSeq()
              .map((person: Person) =>
                  renderPersonalBenefits(person, props.benefitsForPersons[person.id])
              )}
        </Grid>
  );

}

export default withTranslation("translations")(withStyles(styles)(PersonalBenefits));
