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
  let { returns, framework, reportReturns, returns22, returns23, returns24 } = JSON.parse(d);

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
    setPreviousSubmits,
    setLoaded,
    navigate,
    routePrefix,
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

  setLoaded(!!Object.keys(jsonParser(returns[0]["Skills"])).length);

  setLmEmail(returns[0]["LMEmail"]);

  setReportReturns(!reportReturns ? [] : reportReturns.map(reportReturn => ({
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
    navigate(`/submit-skills`);
  } else {
    navigate(`/submit-specialism`);
  }

  setPreviousSubmits({
    returns22: {
      ...returns22[0],
      Skills: returns22[0] && jsonParser(returns22[0]["Skills"]),
    },
    returns23: {
      ...returns23[0],
      Skills: returns23[0] && jsonParser(returns23[0]["Skills"]),
    },
    returns24: {
      ...returns24[0],
      Skills: returns24[0] && jsonParser(returns24[0]["Skills"]),
    },
  })
}

export const saveDataSuccess = (returnVal, { onSubmit }) => {
  onSubmit();
}

export const saveReportSuccess = (returnVal, { onSubmit }) => {
  onSubmit();
}

export const saveReport = (report, saveDataSuccess, saveDataFailure) => google.script
  .run
  .withSuccessHandler(saveReportSuccess)
  .withFailureHandler((err) => {
    console.log(err);
    saveDataFailure(err);
  })
  .withUserObject({ onSubmit: saveDataSuccess })
  .lmValidate(report["Name"], report);

export const getData = userObject => google.script
  .run
  .withSuccessHandler(processData)
  .withFailureHandler((err) => {
    console.log(err)
  })
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
