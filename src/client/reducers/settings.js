import {UPDATE_SETTINGS} from '../../shared/action-types';

const defaultSettings = {
  defaultLife: 20,
  spectatorMode: false,
};

const mergeAndValidateSettings = settingsToMerge => {
  return Object.keys({...defaultSettings, ...settingsToMerge})
    .filter(key => defaultSettings.hasOwnProperty(key))
    .reduce((mergedSettings, key) => {
      return {
        [key]: settingsToMerge[key] || defaultSettings[key],
        ...mergedSettings,
      };
    }, {});
};

const settings = (state = defaultSettings, action) => {
  const {type, settings} = action;
  switch (type) {
    case UPDATE_SETTINGS:
      return mergeAndValidateSettings({...state, ...settings});
    default:
      return state;
  }
};

module.exports = settings;
