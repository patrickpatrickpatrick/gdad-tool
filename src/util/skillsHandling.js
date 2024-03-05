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
