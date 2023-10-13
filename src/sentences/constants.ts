/* eslint-disable import/prefer-default-export */

import * as Yup from 'yup';

import type { AddSentence } from '@sentences/types';

export const addSentenceSchema = Yup.object<AddSentence>({
  personId: Yup.number()
    .typeError("Oups, le type du champ n'est pas correct...")
    .required('Sélectionne une personne !'),
  sentence: Yup.string()
    .typeError("Oups, le type du champ n'est pas correct...")
    .trim()
    .required("N'oublies pas la phrase !")
    .min(5, 'Eh ! Pas trop court la phrase !')
    .max(255, 'Heuu, ça fait beaucoup de caractères quand même...'),
});
