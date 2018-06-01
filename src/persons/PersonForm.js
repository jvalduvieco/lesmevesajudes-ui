//@flow
import React, {Fragment} from "react";
import type {PersonRole} from "./PersonTypes";
import {Person} from "./PersonTypes";
import {Select, TextField} from "redux-form-material-ui";
import ClearIcon from "@material-ui/icons/Clear";
import {Trans} from "react-i18next";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Button, FormLabel, Grid, Hidden, MenuItem} from "@material-ui/core";
import DescriptionText from "../components/Common/DescriptionText";
import {RelacioFamiliar} from "./components/RelacioFamiliar";
import {SituacioLaboral} from "./components/SituacioLaboral";
import {TipusDocumentIdentitat} from "./components/TipusDocumentIdentitat";
import {Question} from "./components/Question";
import {YesNoQuestion} from "./components/YesNoQuestion";
import {MoneyQuestion} from "./components/MoneyQuestion";
import {PercentageQuestion} from "./components/PercentageQuestion";
import {TimePeriodQuestion} from "./components/TimePeriodQuestion";
import {MunicipiEmpadronament} from "./components/MunicipiEmpadronament";

export type PersonFormInitialValues = Person | { is_the_user_in_front_of_the_computer: boolean };

type Props = {
  cobraAlgunTipusDePensioNoContributiva: Boolean,
  edat: number,
  esDesocupat: Boolean,
  esDona: Boolean,
  esFamiliarOUsuari: Boolean,
  esFill: Boolean,
  esFillastre: Boolean,
  handleSubmit: Function,
  haTreballatALEstranger6Mesos: Boolean,
  inscritComADemandantDocupacio: Boolean,
  isTheUserInFrontOfTheComputer: Boolean,
  membreDeFamiliaReagrupada: Boolean,
  municipiEmpadronament: string,
  onCancel: Function,
  potTreballar: Boolean,
  portaDosAnysOMesEmpadronatACatalunya: Boolean,
  rol: PersonRole,
  teAlgunGrauDeDiscapacitatReconegut: Boolean,
  tipusDocumentIdentitat: Boolean,
  treballaPerCompteDAltriParcial: Boolean,
  victimaViolenciaDeGenere: Boolean,
  updating: Boolean
};

let PersonForm = (props: Props) => {
  const {
    cobraAlgunTipusDePensioNoContributiva,
    edat,
    esDesocupat,
    esDona,
    esFamiliarOUsuari,
    esFill,
    esFillastre,
    handleSubmit,
    haTreballatALEstranger6Mesos,
    inscritComADemandantDocupacio,
    isTheUserInFrontOfTheComputer,
    membreDeFamiliaReagrupada,
    municipiEmpadronament,
    potTreballar,
    portaDosAnysOMesEmpadronatACatalunya,
    teAlgunGrauDeDiscapacitatReconegut,
    tipusDocumentIdentitat,
    treballaPerCompteDAltriParcial,
    updating,
    victimaViolenciaDeGenere
  } = props;

  return (
      <Grid container className="bg-container">
        <Grid item xs={12}>
          {isTheUserInFrontOfTheComputer ? <h1>Informació sobre vosté</h1> :
              <h1>Dades sobre una persona que conviu amb vosté</h1>}
        </Grid>
        <Grid container direction="column">
          <form onSubmit={handleSubmit}>
            <Field component="input" name="id" type="hidden"/>
            <Field component="input" name="is_the_user_in_front_of_the_computer" type="hidden"/>
            <Grid container direction="row" justify="space-around" alignItems="stretch">
              <Grid item xs={12} sm={5}>
                <Grid container direction="column" alignItems="stretch" spacing={16}>
                  <Question name="nom" placeholder="Nom" component={TextField} required autoFocus>
                    <Trans>
                      {isTheUserInFrontOfTheComputer ? "Identifiqui's amb un nom" : "Identifiqui'l amb un nom"}
                    </Trans>
                  </Question>

                  {!isTheUserInFrontOfTheComputer && <RelacioFamiliar/>}

                  {esFamiliarOUsuari &&
                  <Fragment>
                    <TimePeriodQuestion name="edat" required>
                      <Trans>Quina és la seva edat?</Trans>
                    </TimePeriodQuestion>

                    <label>
                      <Trans>Sexe</Trans>
                    </label>
                    <Field data-test="sexe" name="sexe" fullWidth component={Select}>
                      <MenuItem data-test="sexe_dona" value="dona">
                        <Trans>Dona</Trans>
                      </MenuItem>
                      <MenuItem data-test="sexe_home" value="home">
                        <Trans>Home</Trans>
                      </MenuItem>
                    </Field>

                    <FormLabel className="sectionTitle">Informació sobre el padró</FormLabel>

                    <TipusDocumentIdentitat/>

                    <YesNoQuestion name="porta_dos_anys_o_mes_empadronat_a_catalunya">
                      <Trans>Porta dos anys o més empadronat a Catalunya?</Trans>
                    </YesNoQuestion>
                  </Fragment>}

                  {esFamiliarOUsuari && esDona && tipusDocumentIdentitat === "passaport" && portaDosAnysOMesEmpadronatACatalunya &&
                  <YesNoQuestion name="membre_de_familia_reagrupada">
                    <Trans>És membre d'una família reagrupada?</Trans>
                  </YesNoQuestion>}

                  {esFamiliarOUsuari && membreDeFamiliaReagrupada &&
                  <YesNoQuestion name="es_una_persona_divorciada">
                    <Trans>És una persona divorciada?</Trans>
                  </YesNoQuestion>}

                  {esFamiliarOUsuari && <MunicipiEmpadronament/>}

                  {municipiEmpadronament === "barcelona" &&
                  <TimePeriodQuestion name="anys_empadronat_a_barcelona" required>
                    <Trans>Quants anys porta empadronat a Barcelona?</Trans>
                  </TimePeriodQuestion>}

                  {esFamiliarOUsuari && potTreballar &&
                  <Fragment>
                    <FormLabel className="sectionTitle"><Trans>Situació laboral</Trans></FormLabel>

                    <SituacioLaboral/>

                    {esFamiliarOUsuari && esDesocupat &&
                    <Fragment>
                      <YesNoQuestion name="inscrit_com_a_demandant_docupacio">
                        <Trans>Està inscrit com a demandant d’ocupació?</Trans>
                      </YesNoQuestion>

                      <YesNoQuestion name="en_els_ultims_12_mesos_ha_fet_baixa_voluntaria_de_la_feina">
                        <Trans>Ha deixat la feina de forma voluntària en els darrers 12 mesos?</Trans>
                      </YesNoQuestion>
                    </Fragment>}

                    {esFamiliarOUsuari && (esDesocupat || treballaPerCompteDAltriParcial) &&
                    <YesNoQuestion name="ha_treballat_a_l_estranger_6_mesos">
                      <Trans>Ha treballat a l’estranger un mínim de 6 mesos?</Trans>
                    </YesNoQuestion>}

                    {haTreballatALEstranger6Mesos &&
                    <YesNoQuestion name="ha_treballat_a_l_estranger_6_mesos_i_ha_retornat_en_els_ultims_12_mesos">
                      <Trans>Ha retornat d’aquest període de treball en els últims 12 mesos?</Trans>
                    </YesNoQuestion>}
                  </Fragment>}

                  <FormLabel className="sectionTitle">Ingressos</FormLabel>
                  <MoneyQuestion name="ingressos_bruts" required>
                    <Trans>Indiqui els seus ingressos bruts anuals de l’any passat?</Trans>
                  </MoneyQuestion>

                  {esFamiliarOUsuari &&
                  <YesNoQuestion name="cobra_algun_tipus_de_pensio_no_contributiva">
                    <Trans>Cobra algun tipus de pensió no contributiva?</Trans>
                  </YesNoQuestion>}

                  {esFamiliarOUsuari && cobraAlgunTipusDePensioNoContributiva &&
                  <Fragment>
                    <MoneyQuestion name="ingressos_per_pnc">
                      <Trans>Indiqui la suma dels imports de totes les pensions no contributives que cobri</Trans>
                    </MoneyQuestion>
                  </Fragment>}

                  {esFamiliarOUsuari && inscritComADemandantDocupacio &&
                  <YesNoQuestion name="gaudeix_de_prestacio_contributiva_o_subsidi_desocupacio">
                    <Trans>Gaudeix actualment d’una prestació contributiva o subsidi per desocupació?</Trans>
                  </YesNoQuestion>}

                  {esFamiliarOUsuari &&
                  <Fragment>
                    <FormLabel className="sectionTitle">Situació personal</FormLabel>
                    <YesNoQuestion name="te_algun_grau_de_discapacitat_reconegut">
                      <Trans>Té vostè algun grau de discapacitat reconegut?</Trans>
                    </YesNoQuestion>

                    {teAlgunGrauDeDiscapacitatReconegut &&
                    <PercentageQuestion name="grau_discapacitat">
                      <Trans>Grau discapacitat</Trans>
                    </PercentageQuestion>}

                    {potTreballar && esDona &&
                    <YesNoQuestion name="victima_violencia_de_genere">
                      <Trans>Víctima violència de gènere</Trans>
                    </YesNoQuestion>}

                    {victimaViolenciaDeGenere &&
                    <YesNoQuestion name="percep_prestacions_incompatibles_amb_la_feina">
                      <Trans>Perceb alguna ajuda que no li permeti treballar?</Trans>
                    </YesNoQuestion>}

                    <YesNoQuestion name="victima_violencia_domestica">
                      <Trans>Víctima violència domèstica</Trans>
                    </YesNoQuestion>

                    {(edat > 18 && edat < 23) && !(esFill || esFillastre) &&
                    <YesNoQuestion name="es_orfe_dels_dos_progenitors">
                      <Trans>És orfe dels dos progenitors</Trans>
                    </YesNoQuestion>}
                  </Fragment>}
                  <br/>
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item md={5}>
                  <DescriptionText/>
                </Grid>
              </Hidden>
            </Grid>

            <Grid item sm={12}>
              <Grid container justify="space-around">
                {(isTheUserInFrontOfTheComputer !== true || updating === true) &&
                <Button variant="raised" color="secondary" onClick={props.onCancel}>
                  <Trans>Cancelar</Trans> <ClearIcon/>
                </Button>}
                <Button variant="raised" color="primary" type="submit" name="ButtonValidar">
                  <Trans>Validar</Trans>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
  );
};

// TODO: El icono AddIcon, se deberia añadir Absolute, 25% y relative al button para probar si funciona bien el tema de align, pero es un parche.
PersonForm = reduxForm({
  form: "PersonForm"
})(PersonForm);

const selector = formValueSelector("PersonForm");

PersonForm = connect(state => {
  const cobraAlgunTipusDePensioNoContributiva = selector(state, "cobra_algun_tipus_de_pensio_no_contributiva");
  const edat = selector(state, "edat");
  const esDesocupat = selector(state, "situacio_laboral") === "desocupat";
  const esDona = selector(state, "genere") === "dona";
  const esFamiliarOUsuari = (typeof selector(state, "relacio_parentiu") !== "undefined" && selector(state, "relacio_parentiu") !== "cap") || selector(state, "is_the_user_in_front_of_the_computer") === true;
  const esFill = selector(state, "relacio_parentiu") === "fill";
  const esFillastre = selector(state, "relacio_parentiu") === "fillastre";
  const haTreballatALEstranger6Mesos = selector(state, "ha_treballat_a_l_estranger_6_mesos");
  const inscritComADemandantDocupacio = selector(state, "inscrit_com_a_demandant_docupacio");
  const isTheUserInFrontOfTheComputer = selector(state, "is_the_user_in_front_of_the_computer");
  const membreDeFamiliaReagrupada = selector(state, "membre_de_familia_reagrupada");
  const municipiEmpadronament = selector(state, "municipi_empadronament");
  const potTreballar = selector(state, "edat") >= 16;
  const portaDosAnysOMesEmpadronatACatalunya = selector(state, "porta_dos_anys_o_mes_empadronat_a_catalunya");
  const rol = selector(state, "rol");
  const teAlgunGrauDeDiscapacitatReconegut = selector(state, "te_algun_grau_de_discapacitat_reconegut");
  const tipusDocumentIdentitat = selector(state, "document_identitat");
  const treballaPerCompteDAltriParcial = selector(state, "situacio_laboral") === "treball_compte_daltri_jornada_parcial";
  const victimaViolenciaDeGenere = selector(state, "victima_violencia_de_genere");
  return {
    cobraAlgunTipusDePensioNoContributiva,
    edat,
    esDesocupat,
    esDona,
    esFamiliarOUsuari,
    esFill,
    esFillastre,
    haTreballatALEstranger6Mesos,
    inscritComADemandantDocupacio,
    isTheUserInFrontOfTheComputer,
    membreDeFamiliaReagrupada,
    municipiEmpadronament,
    potTreballar,
    portaDosAnysOMesEmpadronatACatalunya,
    rol,
    teAlgunGrauDeDiscapacitatReconegut,
    tipusDocumentIdentitat,
    treballaPerCompteDAltriParcial,
    victimaViolenciaDeGenere
  };
})(PersonForm);

export default PersonForm;
