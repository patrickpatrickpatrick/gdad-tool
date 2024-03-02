import { getNameFromEmail, getUniqElements, devGoogle, classifyScore } from './misc';
import { updateSavedSkills } from './skillsHandling';
import { processData, getData, saveData, saveDataSuccess } from './googleRoutines';
import { createErrors, validateInput } from './validation';

export {
  devGoogle,
  classifyScore,
  getNameFromEmail,
  getUniqElements,
  updateSavedSkills,
  createErrors,
  processData,
  getData,
  saveData,
  validateInput,
  saveDataSuccess,
}