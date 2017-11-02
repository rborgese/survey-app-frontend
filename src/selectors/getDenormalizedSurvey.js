import {denormalize} from 'normalizr';

import survey from '../constants/schema';

const getDenormalizedSurvey = (state) => {
   return denormalize(Object.keys(state.surveys)[0], survey, {...state});
};

export default getDenormalizedSurvey;
