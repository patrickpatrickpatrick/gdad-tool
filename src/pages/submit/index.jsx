import { Select } from 'govuk-react';
import { useState, useEffect } from 'react';

import SpecialismSpecificationForm from './SpecialismSpecificationForm';
import SkillsForm from './SkillsForm';

const Submit = ({
  allSpecialties,
  jobFam,
  role,
  roleLevel,
  setJobFam,
  setRole,
  setRoleLevel,
}) => {
  const [section, setSection] = useState('specialismSpecificationForm')
  const [skills, setSkills] = useState([]);
  const [savedSkills, setSavedSkills] = useState({});

  useEffect(() => {
    setSkills(allSpecialties.filter((specialty) =>
      specialty['JobfamilyFILTER'] == jobFam &&
      specialty['RoleFILTER'] == role &&
      specialty['RoleLevelFILTER'] == roleLevel
    ))
  }, [roleLevel])

  return <>
    {
      section == 'specialismSpecificationForm' &&
        <SpecialismSpecificationForm
          changeSection={setSection}
          allSpecialties={allSpecialties}
          {...{
            jobFam,
            role,
            roleLevel,
            setJobFam,
            setRole,
            setRoleLevel,
          }}
        />
    }
    {
      section == 'skillsSection' &&
        <SkillsForm {...{
          jobFam,
          role,
          roleLevel,
          skills,
          savedSkills,
          setSavedSkills,
        }}/>
    }
  </>
}

export default Submit;