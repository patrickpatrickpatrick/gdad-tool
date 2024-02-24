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
