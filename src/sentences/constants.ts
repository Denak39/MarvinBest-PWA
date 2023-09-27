/* eslint-disable import/prefer-default-export */

import * as Yup from 'yup';

import type { AddSentence } from '@sentences/types';

export const addSentenceSchema = Yup.object<AddSentence>({
  personId: Yup.number().required('Sélectionne une personne !'),
  sentence: Yup.string()
    .required('Oublie pas la phrase !')
    .min(5, 'Eh, pas trop court non plus...'),
});
