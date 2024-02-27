import { getUniqElements } from './../../util';

import { Button, Paragraph, InputField } from 'govuk-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SpecialismSelect from './../../components/SpecialismSelect';

const SpecialismSpecificationForm = ({
  allSpecialties,
  selectedRoles,
  changeSection,
  jobFam,
  role,
  roleLevel,
  specialism,
  lmEmail,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const allJobFamilies = getUniqElements(allSpecialties, 'JobfamilyFILTER');
  const [allRoles, setAllRoles] = useState(getUniqElements(allSpecialties, 'RoleFILTER'));
  const [allRoleLevels, setAllRoleLevels] = useState(getUniqElements(allSpecialties, 'RoleLevelFILTER'));

  const [localJobFam, setLocalJobFam ] = useState("");
  const [localRole, setLocalRole ] = useState("");
  const [localRoleLevel, setLocalRoleLevel ] = useState("");
  const [localLmEmail, setLocalLmEmail] = useState("");

  useEffect(() => {
    setLocalLmEmail(lmEmail);
  }, [lmEmail])

  useEffect(() => {
    if (specialism) {
      setLocalRole(specialism["Role"]);
      setLocalRoleLevel(specialism["RoleLevel"])
      setLocalJobFam(specialism["JobFamily"])
    }
  }, [specialism])

  useEffect(() => {
    setAllRoles(
      getUniqElements(
        allSpecialties.filter(x => (localJobFam.length && x['JobfamilyFILTER'] == localJobFam)) , 'RoleFILTER'
      )
    )
    setAllRoleLevels(
      getUniqElements(
        allSpecialties.filter(x => (x['RoleFILTER'] == localRole && x['JobfamilyFILTER'] == localJobFam)) , 'RoleLevelFILTER'
      )
    )    
  }, [localJobFam])

  useEffect(() => {
    setAllRoleLevels(
      getUniqElements(
        allSpecialties.filter(x => (x['RoleFILTER'] == localRole && x['JobfamilyFILTER'] == localJobFam)) , 'RoleLevelFILTER'
      )
    )
  }, [localRole])

  return (<form>
    <Paragraph>
      Your Job Family, Role and Role Level
    </Paragraph>

    <SpecialismSelect
      label="Job Family"
      value={localJobFam}
      setValue={setLocalJobFam}
      options={allJobFamilies}
      disabled={false}
    />

    <SpecialismSelect
      label="Role"
      value={localRole}
      setValue={setLocalRole}
      options={allRoles}
      disabled={allRoles.length == 0}
    />

    <SpecialismSelect
      label="Role Level"
      value={localRoleLevel}
      setValue={setLocalRoleLevel}
      options={allRoleLevels}
      disabled={allRoleLevels.length == 0}
    />

    <InputField
      input={{
        value: localLmEmail,
        onChange: (e) => setLocalLmEmail(e.target.value)
      }}
    >
      Your line manager (if correct, don't edit it)
    </InputField>

    <Button
      disabled={
        !(
          localJobFam.length &&
          allRoles.find(x => x == localRole) &&
          allRoleLevels.find(x => x == localRoleLevel)
        )
      }
      onClick={() => {
       navigate("/submit-skills");
       onSubmit({
        localRole,
        localJobFam,
        localRoleLevel,
        localLmEmail
       }); 
      }}
    >
      Continue to skills for selected role level
    </Button>
  </form>)
}

export default SpecialismSpecificationForm;