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
  // const navigate = useNavigate();

  useEffect(() => {
    setSkills(allSpecialties.filter((specialty) =>
      specialty['JobfamilyFILTER'] == jobFam &&
      specialty['RoleFILTER'] == role &&
      specialty['RoleLevelFILTER'] == roleLevel
    ))
  }, [roleLevel])

  // useEffect(() => {
  //   // console.log('navigate')
  //   // navigate('/')
  // }, [loading])

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