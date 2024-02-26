import { Select } from 'govuk-react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
  savedSkills,
  setSavedSkills,
  loading
}) => {
  const [section, setSection] = useState('specialismSpecificationForm')
  const [skills, setSkills] = useState([]);

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
            loading,
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