// @flow

export type HouseholdData = {
  tipus_familia_nombrosa?: string,
  tipus_familia_monoparental?: string,
  es_usuari_serveis_socials?: boolean,
  custodies?: ?Object //{Person.id: {existeix: boolean, tipus: string}}
};
