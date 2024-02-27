export const getUniqElements = (arr, attribute) =>
  Array.from(new Set(arr.map(item => item[attribute])));

export const updateSavedSkills = (
  savedSkills,
  skillName,
  attribute,
  value,
) => ({
  ...savedSkills,
  [skillName]: {
    ...savedSkills[skillName],
    [attribute]: value,
  }  
});

export const processData = (d, dict) => {
  let { returns, framework, reportReturns } = JSON.parse(d);

  let {
    setLoading,
    setRoles,
    setJobFam,
    setRole,
    setRoleLevel,
    setSavedSkills,
    setSpecialism,
    navigate
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

  setLoading(false);
  navigate('/submit-specialism');
}

export const getData = (userObject) => google.script.run
  .withSuccessHandler(processData)
  .withUserObject(userObject)
  .getData();