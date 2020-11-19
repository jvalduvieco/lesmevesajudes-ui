//@flow
import {Button, Grid, MenuItem, withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Trans} from "react-i18next";
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {renderTextField} from '../components/FormComponents/MaterialUIFields';
import MultipleAnswerQuestion from '../components/FormComponents/MultipleAnswerQuestion';
import {YesNoQuestion} from '../components/FormComponents/YesNoQuestion';
import {email, required} from '../shared/formValidators';
import Spinner from '../shared/spinner.svg';
import * as UUID from '../shared/UUID';
import {styles} from '../styles/theme'

type Props = {
  classes: Object,
  currentState: any,
  handleSubmit: Function,
  resultatIncorrecte: boolean,
  initialValues: Object,
  isError: boolean,
  isRequestDone: boolean,
  reset: Function,
  requestInProgress: boolean,
}

const resetForm = (reset: Function) => {
  return () => {
    localStorage.removeItem('reporter_email');
    localStorage.removeItem('test_group');
    return reset();
  }
};

const ReportBugForm = (props: Props) => {
  const {handleSubmit, resultatIncorrecte, isError, isRequestDone, requestInProgress, reset, classes} = props;
      if (requestInProgress) return (
          <Grid container direction='column'>
            <Grid item sm={12}>
              <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item>
                  <img className="spinner" src={Spinner} width="40" alt="carregant"/>
                </Grid>
                <Grid item>
                  <Typography align='center'>
                    <Trans i18nKey='carregant'>Carregant...</Trans>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      );

  if (!isRequestDone) {
        return (
            <Grid container direction='row' justify='space-around' className={classes.appForm}>
              <Grid item xs={11}>
                <Grid container direction='column'>
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                      <Typography variant='h5' gutterBottom>
                        <Trans i18nKey='informar_resultat_simulacio'>
                          Informar del resultat de la simulació
                        </Trans>
                      </Typography>
                    </Grid>
                    <Grid container item xs={6} direction='column' spacing={2}>
                      <Grid item>
                        <YesNoQuestion name='accepted_result' validate={[required]}>
                          <Trans i18nKey='el_resultat_es_correcte'>
                            El resultat de la simulació és correcte?
                          </Trans>
                        </YesNoQuestion>
                      </Grid>
                      {resultatIncorrecte &&
                      <Grid item>
                        <label>
                          <Trans i18nKey='resultat_esperat'>
                            Indiqui quin és el resultat esperat (ajuda que esperava rebre, persones que l'hauríen de
                            rebre, ..
                            )
                          </Trans>
                        </label>
                        <Field name='expected_result' placeholder='...' fullWidth component={renderTextField}
                               validate={[required]}/>
                      </Grid>
                      }
                      <Grid item>
                        <label><Trans i18nKey='comentaris_o_millores'>Comentaris o millores</Trans></label>
                        <Field name='comments' placeholder='...' fullWidth component={renderTextField}/>
                      </Grid>
                      <Grid item>
                        <label><Trans i18nKey='faciliti_correu_electronic'>Faciliti el seu correu
                          electrònic</Trans></label>
                        <Field name='reporter_email' placeholder='john@doe.com' fullWidth component={renderTextField}
                               validate={[required, email]}/>
                      </Grid>
                      <Grid item>
                        <MultipleAnswerQuestion label={<Trans i18nKey='grup_de_proves'>Grup de proves</Trans>}
                                                name='test_group'
                                                validate={[required]}>
                          <MenuItem value='professional_serveis_socials'>
                            <Trans i18nKey='professional_serveis_socials'>Professional serveis socials</Trans>
                          </MenuItem>
                          <MenuItem value='entitat_del_tercer_sector'>
                            <Trans i18nKey='entitat_tercer_sector'>Entitat del tercer sector</Trans>
                          </MenuItem>
                          <MenuItem value='altre_personal_de_l_ajuntament_de_barcelona'>
                            <Trans i18nKey='altre_personal_de_l_ajuntament_de_barcelona'>
                              Altre personal de l'ajuntament de barcelona
                            </Trans>
                          </MenuItem>
                          <MenuItem value='altres'>
                            <Trans i18nKey='altres_grups_de_proves'>Altres</Trans>
                          </MenuItem>
                        </MultipleAnswerQuestion>
                      </Grid>
                      <Field component='input' name='application_state' type='hidden'/>
                      <Field component='input' name='simulation_id' type='hidden'/>
                    </Grid>
                    <Grid container direction='row' justify='space-around' style={{paddingTop: '32px'}}>
                      <Grid item className='margin-buttons'>
                        <Button variant='contained' color='primary' type='submit'>
                          <Trans i18nKey='informar'>Informar</Trans>
                        </Button>
                      </Grid>
                      <Grid item className='margin-buttons'>
                        <Button variant='contained' color='secondary' onClick={resetForm(reset)}>
                          <Trans i18nKey='netejar'>Netejar</Trans>
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>

        );
      } else if (isRequestDone && !isError) {
        return (
            <Grid container direction='column'>
              <Grid item sm={12}>
                <Typography variant='h5' gutterBottom>
                  <Trans i18nKey='gracies_per_informar'>Gràcies per informar del resultat de la simulació</Trans>
                </Typography>
              </Grid>
            </Grid>
        )
      } else if (isRequestDone && isError) {
        return (<Grid container direction='column'>
          <Grid item sm={12}>
            <Typography variant='h5' gutterBottom>
              <Trans i18nKey='hi_ha_hagut_una_errada'>Hi ha hagut un error informant de l'errada.</Trans>
            </Typography>
          </Grid>
        </Grid>)
      }
    }
;

const selector = formValueSelector('ReportBugForm');

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {...ownProps.initialValues, application_state: JSON.stringify(state), simulation_id: UUID.create()}, // simulation_id should be retrieved from state and not created here
    resultatIncorrecte: selector(state, 'accepted_result') === false,
    isError: state.reportBug.isError,
    isRequestDone: state.reportBug.isRequestDone,
    requestInProgress: state.reportBug.requestInProgress,
    response: state.reportBug.response
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'ReportBugForm',
})(withStyles(styles)(ReportBugForm)));
