import React, {Component} from "react";
import StepZilla from "react-stepzilla";
import PersonsPage from "../persons/PersonsPage";
import RentForm from "../rent/RentForm";
import ResultsPage from "../results/ResultsPage";
import "./Wizard.css";
import AppHeader from "../components/AppHeader/AppHeader";
import {translate} from "react-i18next";
import HouseholdForm from "../household/HouseholdForm";
import {Grid} from 'material-ui'
import StepsComponent from '../components/Steps/StepsComponent';

class WizardPage extends Component {
  render() {
    const { t } = this.props;

    const steps = [
      {name: t("Persones que conviuen"), component: <PersonsPage/>},
      { name: t("Família"), component: <HouseholdForm /> },
      { name: t("Domicili habitual"), component: <RentForm /> },
      { name: t("Resultats"), component: <ResultsPage /> }
    ];

    return (
      <Grid>
        <AppHeader />
        {/* <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            prevBtnOnLastStep={true}
            nextTextOnFinalActionStep={"Veure resultats"}
            nextButtonText="Següent"
            backButtonText="Anterior"
            nextButtonCls="btn btn-next btn-primary btn-lg nextButton"
            backButtonCls="btn btn-prev btn-primary btn-lg backButton"
        /> */}
        <StepsComponent/>
      </Grid>
    );
  }
}

export default translate("translations")(WizardPage);
