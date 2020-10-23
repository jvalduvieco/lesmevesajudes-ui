import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';
import {STATIC_ROOT} from './config';
import isDevelopment from './shared/isDevelopment';
import pathTransformLngDetector from './shared/pathTransformLngDetector';

const lngDetector = new LngDetector();

lngDetector.addDetector(pathTransformLngDetector);

const languageDetectorOptions = {
  order: ['pathTransform'],
  lookupFromPathIndex: 1,
  transforms: {'ca': 'ca-ES'},
};

i18n
  .use(Backend)
  .use(lngDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ca-ES',

    detection: languageDetectorOptions,

    // have a common namespace used around the full app
    ns: ['translations','dashboard'],
    defaultNS: 'translations',

    debug: isDevelopment,

    interpolation: {
      escapeValue: false // not needed for react!!
    },
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: STATIC_ROOT + '/locales/{{lng}}/{{ns}}.json'
    },
    react: {
      wait: true
    }
  });



export default i18n;
