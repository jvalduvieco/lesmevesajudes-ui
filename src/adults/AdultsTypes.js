// @flow
import {Map} from "immutable";

export type AdultId = string;

export type PersonRole = 'pares'|'fill'|'altres_adults'|'altres_adults_familiars';

export class Adult {
  data_naixement: string;
  data_alta_padro: string;
  demandant_d_ocupacio_durant_12_mesos: boolean = false;
  durant_el_mes_anterior_ha_presentat_solicituds_recerca_de_feina: boolean = false;
  en_els_ultims_12_mesos_ha_fet_baixa_voluntaria_de_la_feina: boolean = false;
  es_divorciada_de_familia_reagrupada: boolean = false;
  es_escolaritzat_entre_P3_i_4rt_ESO: boolean = false;
  es_orfe_dels_dos_progenitors: boolean = false;
  genere: string;
  grau_discapacitat: number = 0;
  ha_estat_beneficiari_de_la_rai_en_els_ultims_12_mesos: boolean = false;
  ha_esgotat_prestacio_de_desocupacio: boolean = false;
  ha_estat_beneficiari_de_les_tres_rai_anteriors: boolean = false;
  ha_treballat_a_l_estranger_6_mesos: boolean = false;
  ha_treballat_a_l_estranger_6_mesos_i_ha_retornat_en_els_ultims_12_mesos: boolean = false;
  id: AdultId;
  ingressat_en_centre_penitenciari: boolean = false;
  ingressat_en_centre_penitenciari_pot_treballar: boolean = false;
  ingressos_bruts: number = 0;
  inscrit_com_a_demandant_docupacio: boolean = false;
  nom: string;
  perceb_alguna_ajuda_que_no_li_permeti_treballar: boolean = false;
  rol: PersonRole;
  situacio_laboral: string;
  tipus_document_identitat: string;
  victima_violencia_de_genere: boolean = false;
  victima_violencia_domestica: boolean = false;
}

export type AdultState = Map<AdultId, Adult>;
