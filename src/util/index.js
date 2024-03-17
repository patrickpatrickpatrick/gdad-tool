import { getNameFromEmail, getUniqElements, devGoogle, classifyScore, validateEmail } from './misc';
import { updateSavedSkills } from './skillsHandling';
import { processData, getData, saveData, saveDataSuccess, saveReport } from './googleRoutines';
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
  validateEmail,
  saveDataSuccess,
  saveReport,
}