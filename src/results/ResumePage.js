import React from 'react';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {PrintResidenceForm} from '../residence/ResidenceForm';
import {PrintFamilyForm} from '../family/FamilyForm';
import {styles} from '../styles/theme';
import PrintResultsPage from './PrintResultsPage';
import PrintStepsComponent from '../components/Steps/StepsComponent';
import {steps} from '../pages/Wizard.js';
import {PrintPersonForm} from '../persons/PersonForm';
import FormSubTitle from '../components/FormComponents/FormSubTitle';
import {serialize} from '../persons/PersonsReducer';
import {esFill} from '../shared/selectorUtils';
import {areMenors} from '../pages/Wizard.js';
import {families016} from '../shared/OpenFiscaAPIClient/RequestBuilder';
import {toArray} from '../family/createFamilyName';
import {esSustentador} from '../shared/selectorUtils';
import {sustentadorsSolitarisIPossiblesParelles} from "../family/FamilyForm";

const ResumePage = (props) => {

	  const {persons, residence, family} = props;

		const printSteps = [];
		steps.map((step, index) => printSteps.push({label: step.label, icon: step.icon}));

//		const hostUrl = window.location.origin;

		const serializedPersons = serialize(persons);

			var custodies;
			var families;
			var sustentadorsSolitarisAmbPossiblesParelles;
			// family consts
			if (family) {
				custodies = family ? family.custodies : null;
				families = toArray(families016(custodies, persons.toArray(), family));
				const familiesMonoparentals = families.filter((familia) => familia.monoparental);
				const sustentadorsUnicsIDs = familiesMonoparentals.map((familia) => familia.sustentadors_i_custodia[0]);
				const sustentadorsSolitaris = persons.filter((person: Person) => sustentadorsUnicsIDs.includes(person.id));
				sustentadorsSolitarisAmbPossiblesParelles = sustentadorsSolitarisIPossiblesParelles(sustentadorsSolitaris, persons.toArray());
			}

			// residence consts
			const esCessio = residence.relacio_habitatge === 'cessio';
			const esLlogater= residence.relacio_habitatge === 'llogater';
			const esPropietari = (residence.relacio_habitatge === 'propietari') || (residence.relacio_habitatge === 'propietari_hipoteca');

			return (
				<Grid>
					<Grid className="page-step printable-only" >
						<PrintStepsComponent steps={printSteps} buttonVisible={false} step={0}/>
						{serializedPersons.map((person,index) => {
								const formKey = 'PersonForm' + index;
								const esFamiliarOUsuari=(typeof person.relacio_parentiu !== 'undefined'	&& person.relacio_parentiu !== 'cap')
									|| person.is_the_person_in_front_of_the_computer === true;
								return (<Grid key={formKey}>
											<Grid container justify='space-around' alignItems='stretch'>
												<FormSubTitle>Persona {index + 1}</FormSubTitle>
											</Grid>
											{/*since component is not connected to store it we must pass same data managed in mapStateToProps*/}
											<PrintPersonForm initialValues={person}
												esFamiliarOUsuari={esFamiliarOUsuari}
												edat = {person.edat}
												esAturat = {person.situacio_laboral === 'person.aturat'}
												esDona = {person.sexe === 'dona'}
												esHome = {person.sexe === 'home'}
												esFill = {person.relacio_parentiu === 'fill'}
												esFillastre = {person.relacio_parentiu === 'fillastre'}
												haTreballatALEstranger6Mesos = {person.ha_treballat_a_l_estranger_6_mesos}
												inscritComADemandantDocupacio = {person.inscrit_com_a_demandant_docupacio}
												isTheUserInFrontOfTheComputer = {person.is_the_person_in_front_of_the_computer}
												membreDeFamiliaReagrupada = {person.membre_de_familia_reagrupada}
												municipiEmpadronament = {person.municipi_empadronament}
												sentirseSol = {person.sentirse_sol}
												potTreballar = {person.edat >= 16}
												portaDosAnysOMesEmpadronatACatalunya = {person.porta_dos_anys_o_mes_empadronat_a_catalunya}
												rol = {person.rol}
												teAlgunGrauDeDiscapacitatReconegut = {person.te_algun_grau_de_discapacitat_reconegut}
												tipusDocumentIdentitat = {person.tipus_document_identitat}
												treballaPerCompteDAltriParcial = {person.situacio_laboral === 'treball_compte_daltri_jornada_parcial'}
												form={formKey} />
										</Grid>
								)
							})
						}
					</Grid>

					{areMenors(persons) &&
						<Grid className="page-step printable-only">
							<PrintStepsComponent steps={printSteps} buttonVisible={false} step={1}/>
							<PrintFamilyForm custodies = {custodies}
							    families = {families}
							    fills = {persons.filter((person: Person) => esFill(person))}
							    initialValues = {family}
							    persones = {persons}
							    possiblesSustentadors = {persons.filter((person: Person) => esSustentador(person))}
							    sustentadorsSolitarisAmbPossiblesParelles = {sustentadorsSolitarisAmbPossiblesParelles}
							    custodiesValues = {family.custodiesValues}
								form="PrintFamilyForm"/>
						</Grid>
					}

					<Grid className="page-step printable-only">
						<PrintStepsComponent steps={printSteps} buttonVisible={false} step={2}/>

						{/*since component is not connected to store it we must pass same data managed in mapStateToProps*/}
						<PrintResidenceForm
							esCessio = {esCessio}
						    esLlogater= {esLlogater}
						    esPropietari= {esPropietari}
						    existeixDeutePagamentLloguer = {residence.existeix_deute_en_el_pagament_del_lloguer}
						    existeixDeutePagamentHipoteca = {residence.existeix_deute_en_el_pagament_de_la_hipoteca}
						    existeixHipoteca = {residence.relacio_habitatge === 'propietari_hipoteca'}
						    haEstatDesnonat = {residence.ha_perdut_lhabitatge_en_els_ultims_2_anys}
						    haRebutNotificacio = {residence.ha_rebut_una_notificacio_de_desnonament}
						    haSeleccionatAlgunaRelacioAmbLHabitatge = {residence.relacio_habitatge != null}
						    initialValues= {residence}
						    nombreDePersonesQueConviuen = {persons.count()}
						    noTeHabitatgeFix = {residence.relacio_habitatge === 'no_en_te'}
						    personesQuePodenTenirContracte = {persons.filter((persona) => !esFill(persona))}
						    properContracteDeLloguer = {residence.proper_contracte_de_lloguer}
						    teAlgunaPropietat = {residence.tinc_alguna_propietat_a_part_habitatge_habitual}
						    teHabitatgeHabitual= {esLlogater || esPropietari || esCessio}
						    titularContracteLloguer = {persons.get(residence.titular_contracte_de_lloguer_id)}
						    titularContracteHipoteca = {persons.get(residence.titular_hipoteca_id)}
							form="PrintResidenceForm"/>
					</Grid>

					<Grid className="page-step">
						<PrintResultsPage/>
					</Grid>
				</Grid>);
			};

export default withStyles(styles)(connect(null,null)(ResumePage));
