import {ENABLE_EXPERIMENTS} from '../../shared/action-types';

const enableExperiments = (state = false, action) => {
  return action.type === ENABLE_EXPERIMENTS ? true : state;
};

export default enableExperiments;
