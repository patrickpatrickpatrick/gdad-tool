export const createErrors = (errors) => Object.keys(errors).reduce(
  (acc, error) => {
    return [
      ...acc,
      ...Object.keys(errors[error]).map(section => ({
        targetName: `${error.replace(/\s/g, '')}-${section}`,
        text: `${errors[error][section]} for ${error}`
      }))
    ]
  }
,[]);

export const validateInput = (input, skills) => {
  let tempErrors = {}

  skills.map(({ SkillNameFILTER }) => {
    if (!input[SkillNameFILTER]["Score"].length) {
      tempErrors = {
        ...tempErrors,
        [SkillNameFILTER]: {
          ...tempErrors[SkillNameFILTER],
          ["Score"]: "Please select a score"
        }
      }
    }

    if (input[SkillNameFILTER]["Comments"].length > 3000) {
      tempErrors = {
        ...tempErrors,
        [SkillNameFILTER]: {
          ...tempErrors[SkillNameFILTER],
          ["Comments"]: `Please reduce comments to 3000 or less characters`
        }
      }
    }

    if (input[SkillNameFILTER]["Evidence"].length > 3000) {
      tempErrors = {
        ...tempErrors,
        [SkillNameFILTER]: {
          ...tempErrors[SkillNameFILTER],
          ["Evidence"]: `Please reduce evidence to 3000 or less characters`
        }
      }
    }
  })

  return tempErrors;
}