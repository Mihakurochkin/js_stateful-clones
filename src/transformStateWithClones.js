'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateHistory = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(stateClone, obj.extraData);
      stateHistory.push({ ...stateClone });
    }

    if (obj.type === 'removeProperties') {
      for (const item of obj.keysToRemove) {
        delete stateClone[item];
      }
      stateHistory.push({ ...stateClone });
    }

    if (obj.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
      stateHistory.push({ ...stateClone });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
