import {UPDATE_SETTINGS} from '../../shared/action-types';

const defaultSettings = {
  defaultLife: 20,
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
      return mergeAndValidateSettings(settings);
    default:
      return state;
  }
};

module.exports = settings;
