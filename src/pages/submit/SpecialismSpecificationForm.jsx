import { getUniqElements } from './../../util';

import { Button, Paragraph } from 'govuk-react';
import { useState, useEffect, useRef } from 'react';

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
  loading,
}) => {
  const allJobFamilies = getUniqElements(allSpecialties, 'JobfamilyFILTER');
  const [allRoles, setAllRoles] = useState(getUniqElements(allSpecialties, 'RoleFILTER'));
  const [allRoleLevels, setAllRoleLevels] = useState(getUniqElements(allSpecialties, 'RoleLevelFILTER'));

  const [localJobFam, setLocalJobFam ] = useState("");
  const [localRole, setLocalRole ] = useState("");
  const [localRoleLevel, setLocalRoleLevel ] = useState("");

  const jobFamRef = useRef();
  const roleRef = useRef();
  const roleLevelRef = useRef();

  useEffect(() => {
    setLocalJobFam(jobFam)
    setLocalRole(role)
    setLocalRoleLevel(roleLevel)
  }, [role, roleLevel, jobFam])

  useEffect(() => {
    if (localJobFam !== jobFam) {
      setLocalRole("")
      setLocalRoleLevel("")    
    }

    jobFamRef.current.value = localJobFam
    setAllRoles(getUniqElements(allSpecialties.filter(x => x['JobfamilyFILTER'] == localJobFam), 'RoleFILTER'));
  }, [localJobFam])

  useEffect(() => {
    if (localRole !== role) {
      setRoleLevel("");
    }

    roleRef.current.value = localRole;

    setAllRoleLevels(getUniqElements(allSpecialties.filter(x => x['RoleFILTER'] == localRole), 'RoleLevelFILTER'));
  }, [localRole, allRoles])

  useEffect(() => {
    roleLevelRef.current.value = localRoleLevel;
  }, [localRoleLevel, allRoleLevels])

  return (<form>
    <Paragraph>
      Your Job Family, Role and Role Level
    </Paragraph>

    <SpecialismSelect
      label="Job Family"
      value={localJobFam}
      setValue={setLocalJobFam}
      options={allJobFamilies}
      inputRef={jobFamRef}
      disabled={false}
    />

    <SpecialismSelect
      label="Role"
      value={localRole}
      setValue={setLocalRole}
      options={allRoles}
      inputRef={roleRef}
      disabled={!localJobFam.length}
    />

    <SpecialismSelect
      label="Role Level"
      value={localRoleLevel}
      setValue={setLocalRoleLevel}
      options={allRoleLevels}
      inputRef={roleLevelRef}
      disabled={!localRole.length}
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