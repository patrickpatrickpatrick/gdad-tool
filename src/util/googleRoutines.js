export const processData = (d, dict) => {
  let { returns, framework, reportReturns } = JSON.parse(d);

  let {
    setFramework,
    setRole,
    setJobFam,
    setRoleLevel,
    setSavedSkills,
    setSpecialism,
    setLmEmail,
    setReportReturns,
    setSkills,
    setLoading,
    setCompleted,
    navigate,
  } = dict;

  setFramework(framework);

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

  setReportReturns(reportReturns.map(reportReturn => ({
    ...reportReturn,
    ["Skills"]: JSON.parse(reportReturn["Skills"])
  })));

  setSkills(framework.filter((specialty) =>
    specialty['JobfamilyFILTER'] == returns[0]["JobFamily"] &&
    specialty['RoleFILTER'] == returns[0]["Role"] &&
    specialty['RoleLevelFILTER'] == returns[0]["RoleLevel"]
  ))  

  setLoading(false);

  setCompleted(returns[0]["Completed"] == 'Yes');

  if (returns[0]["RoleLevel"] && returns[0]["RoleLevel"].length > 0) {
    navigate('/submit-specialism');
  } else {
    navigate('/submit-skills');
  }
}

export const saveDataSuccess = (userInput, onSuccess) => {
  onSuccess();
}

export const getData = (userObject) => google.script
  .run
  .withSuccessHandler(processData)
  .withUserObject(userObject)
  .getData();

export const saveData = (userObject) => google.script
  .run
  .withSuccessHandler(saveDataSuccess)
  .withUserObject(userObject)
  .saveReturn();
