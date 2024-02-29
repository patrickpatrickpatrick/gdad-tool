export const getNameFromEmail = (email) => email.match(/(.*)@.*/)[1]
.split('.')
.map(([firstLetter, ...restLetters]) => [ firstLetter.toUpperCase(), ...restLetters ].join('') )
.join(' ')

export const getUniqElements = (arr, attribute) =>
  Array.from(new Set(arr.map(item => item[attribute])));

export const classifyScore = (savedSkills) => {
  const scores = Object.keys(savedSkills).map(
    skill => parseInt(savedSkills[skill]["Score"])
  )
  
  const score = scores.reduce((acc, s) => s + acc, 0) / scores.length;

  switch(true){
    case score < 1:
      return "";
    case score < 1.5:
      return "Developing";
    case score < 2:
      return "Proficient A";
    case score < 2.5:
      return "Proficient B";
    case score < 3:
      return "Accomplished A";
    case score === 3:
      return "Accomplished B";
    default:
      return "";
  }
}

export const devGoogle = (...parameters) => {
  const [
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
  ] = parameters;

  fetch('/return.json').then(
    response => response.json()
  ).then(({ skills, returns }) => {
    setRoles(skills);
    setRole(returns[0]["Role"]);
    setJobFam(returns[0]["JobFamily"]);
    setRoleLevel(returns[0]["RoleLevel"]);
    setSavedSkills(JSON.parse(returns[0]["Skills"]));
    setSpecialism({
      "Role": returns[0]["Role"],
      "JobFamily": returns[0]["JobFamily"],
      "RoleLevel": returns[0]["RoleLevel"],
    })
    setLmEmail(returns[0]["LMEmail"]);

    setReportReturns([
      {
        ...returns[0],
        Skills: JSON.parse(returns[0]["Skills"])
      }
    ]);

    setSkills(skills.filter((specialty) =>
      specialty['JobfamilyFILTER'] == returns[0]["JobFamily"] &&
      specialty['RoleFILTER'] == returns[0]["Role"] &&
      specialty['RoleLevelFILTER'] == returns[0]["RoleLevel"]
    ))

    setLoading(false);

    navigate("/submit-specialism")
  })
}