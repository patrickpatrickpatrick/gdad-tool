function jsonParser(str) {
  let temp;

  try {
    temp = JSON.parse(str)
  } catch (e) {
    console.log(e)
    temp = {}
  }

  return temp;
}

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
    setValidated,
    navigate,
  } = dict;

  setFramework(framework);

  setSpecialism({
    "Role": returns[0]["Role"] || "",
    "JobFamily": returns[0]["JobFamily"] || "",
    "RoleLevel": returns[0]["RoleLevel"] || "",
  })

  setRole(returns[0]["Role"] || "");
  setJobFam(returns[0]["JobFamily"] || "");
  setRoleLevel(returns[0]["RoleLevel"] || "");

  setSavedSkills(jsonParser(returns[0]["Skills"]));

  setLmEmail(returns[0]["LMEmail"]);

  setReportReturns(reportReturns.map(reportReturn => ({
    ...reportReturn,
    ["Skills"]: jsonParser(reportReturn["Skills"])
  })));

  if (
    returns[0]["JobFamily"] &&
    returns[0]["Role"] &&
    returns[0]["RoleLevel"]
  ) {
    setSkills(framework.filter((specialty) =>
      specialty['JobfamilyFILTER'] == returns[0]["JobFamily"] &&
      specialty['RoleFILTER'] == returns[0]["Role"] &&
      specialty['RoleLevelFILTER'] == returns[0]["RoleLevel"]
    ))
  }

  setLoading(false);

  setCompleted(returns[0]["Completed"] == 'Yes');

  setValidated(returns[0]["LineManagerApproved"] == 'Yes')

  if (returns[0]["RoleLevel"]) {
    navigate('/submit-skills');
  } else {
    navigate('/submit-specialism');
  }
}

export const saveDataSuccess = (returnVal, { onSubmit }) => {
  onSubmit();
}

export const saveReportSuccess = (returnVal, { onSuccess }) => {
 onSuccess();
}

export const saveReport = (params, saveDataSuccess) => google.script
  .run
  .withSuccessHandler(processData)
  .withUserObject({ onSubmit: saveDataSuccess })
  .getData(params);

export const getData = userObject => google.script
  .run
  .withSuccessHandler(processData)
  .withUserObject(userObject)
  .getData();

export const saveData = (params, saveDataSuccess) => google.script
  .run
  .withSuccessHandler(saveDataSuccess)
  .withFailureHandler((err) => {
    console.log(err)
  })
  .withUserObject({ onSubmit: saveDataSuccess })
  .saveReturn(params);
