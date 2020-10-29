/*

{
    id_simulacio: '5a45921d-a302-4221-9125-dcfb3c45f2d2',
    data: ISODate('2019-11-01T00:00:00.000Z'),
    persones: [
        {
            ajudes: [],
            sexe: 'dona',
            edat: '48',
            discapacitat: false,
            violencia: false,
            escolaritzacio: false,
            situacio_laboral: 'treball_compte_daltri_jornada_parcial'
        },
        {
            ajudes: [
                'EG_233_mensual',
                'GA_246_01'
            ],
            sexe: 'home',
            edat: '8',
            discapacitat: true,
            violencia: false,
            escolaritzacio: true
        }
    ],
    habitatge: {
        ajudes: ['HA_001', 'HA_002'],
        estatus:
    },
    __v: 0
}
*/

export type AidType = {
  codi: String,
  descripcio: String, 
}

export type ResultType = {

}

export type SexType = {
  homes: int,
  dones: int
}

export type YesNoType = {
  yes: int,
  no: int
}

export type FilterType = {
  sex: string,
  age: string,
  school: boolean
}
