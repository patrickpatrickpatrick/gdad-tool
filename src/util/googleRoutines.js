export const processData = (d, dict) => {
  let { returns, framework, reportReturns } = JSON.parse(d);

  let {
    setRoles,
    setRole,
    setJobFam,
    setRoleLevel,
    setSavedSkills,
    setSpecialism,
    setLmEmail,
    setReportReturns,
    setSkills,
    setLoading,
    navigate,
  } = dict;

  setRoles(framework);

  setSpecialism({
    "Role": returns[0]["Role"],
    "JobFamily": returns[0]["JobFamily"],
    "RoleLevel": returns[0]["RoleLevel"],
  })

  setRole(returns[0]["Role"]);
  setJobFam(returns[0]["JobFamily"]);
  setRoleLevel(returns[0]["RoleLevel"]);
  setSavedSkills(JSON.parse(returns[0]["Skills"]));
  setLmEmail(returns[0]["LMEmail"]);

  setReportReturns(reportReturns);

  setSkills(skills.filter((specialty) =>
    specialty['JobfamilyFILTER'] == returns[0]["JobFamily"] &&
    specialty['RoleFILTER'] == returns[0]["Role"] &&
    specialty['RoleLevelFILTER'] == returns[0]["RoleLevel"]
  ))  

  setLoading(false);
  navigate('/submit-specialism');
}

export const saveData = (userInput, toValidate, onSuccess) => {
  if (toValidate) {
    console.log('well, its ready for ur LM to validate');
  } else {
    console.log('well, just saving it')
  }

  onSuccess();

  console.log(userInput)

  return userInput;
}

export const getData = (userObject) => google.script.run
  .withSuccessHandler(processData)
  .withUserObject(userObject)
  .getData();
