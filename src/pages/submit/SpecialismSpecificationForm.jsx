import { getUniqElements } from './../../util';

import { Button } from 'govuk-react';
import { useState, useEffect } from 'react';

import SpecialismSelect from './../../components/SpecialismSelect';

const SpecialismSpecificationForm = ({
  allSpecialties,
  selectedRoles,
  changeSection,
  jobFam,
  role,
  roleLevel,
  setJobFam,
  setRole,
  setRoleLevel,
}) => {
  const allJobFamilies = getUniqElements(allSpecialties, 'JobfamilyFILTER');
  const [allRoles, setAllRoles] = useState([]);
  const [allRoleLevels, setAllRoleLevels] = useState([]);

  useEffect(() => {
    setRole("");
    setRoleLevel("");
    setAllRoles(getUniqElements(allSpecialties.filter(x => x['JobfamilyFILTER'] == jobFam), 'RoleFILTER'));
  }, [jobFam])

  useEffect(() => {
    setRoleLevel("");
    setAllRoleLevels(getUniqElements(allSpecialties.filter(x => x['RoleFILTER'] == role), 'RoleLevelFILTER'));
  }, [role])

  return (<form>
    <p>
      Your Job Family, Role and Role Level
    </p>

    <SpecialismSelect
      label="Job Family"
      value={jobFam}
      setValue={setJobFam}
      options={allJobFamilies}
      disabled={false}
    />

    <SpecialismSelect
      label="Role"
      value={role}
      setValue={setRole}
      options={allRoles}
      disabled={!jobFam.length}
    />

    <SpecialismSelect
      label="Role Level"
      value={roleLevel}
      setValue={setRoleLevel}
      options={allRoleLevels}
      disabled={!role.length}
    />

    <Button
      className={'govuk-button--disabled'}
      disabled={!(jobFam && role && roleLevel)}
      onClick={() => changeSection('skillsSection')}
    >
      Continue to skills for selected role level
    </Button>
  </form>)
}

export default SpecialismSpecificationForm;