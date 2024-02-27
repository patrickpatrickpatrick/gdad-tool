import { useState, useEffect } from 'react'
import { LoadingBox } from 'govuk-react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { Page } from './components';
import { SpecialismSpecificationForm, SkillsForm } from './pages/submit';
import { Validate } from './pages';

import { processData, getData } from './util';

import 'normalize.css'

const pageText = {
  "submit": {
    "heading": "Your Submission",
    "leadParagraph": "Use this page to submit your DDaT skills assessment"
  },
  "validate": {
    "heading": "Validate Your Line Report Submissions",
    "leadParagraph": "Please validate your line report submissions",
  }
}

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([])
  const [skills, setSkills] = useState([]);

  const [specialism, setSpecialism] = useState(null)

  const [jobFam, setJobFam] = useState("");
  const [role, setRole] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [savedSkills, setSavedSkills] = useState({});
  const [lmEmail, setLmEmail] = useState("");


  useEffect(() => {
    setSkills(roles.filter((specialty) =>
      specialty['JobfamilyFILTER'] == jobFam &&
      specialty['RoleFILTER'] == role &&
      specialty['RoleLevelFILTER'] == roleLevel
    ))
  }, [roleLevel])

  useEffect(() => {
    if (typeof google !== 'undefined') {
      getData({
        setLoading,
        setRoles,
        setJobFam,
        setRole,
        setRoleLevel,
        setSavedSkills,
        setSpecialism,
        navigate,
      })
    } else {
      fetch('/roleLevelData.json').then(
        response => response.json()
      ).then(data => {
        setRoles(data);
        fetch('/return.json').then(
          response => response.json()
        ).then(data => {
          setRole(data[0]["Role"]);
          setJobFam(data[0]["JobFamily"]);
          setRoleLevel(data[0]["RoleLevel"]);
          setSavedSkills(JSON.parse(data[0]["Skills"]));
          setLoading(false);
          setSpecialism({
            "Role": data[0]["Role"],
            "JobFamily": data[0]["JobFamily"],
            "RoleLevel": data[0]["RoleLevel"],
          })
          setLmEmail(data[0]["LMEmail"]);
        })
      })
    }
  }, []);

  const onSubmitSpecialismSpecificationForm = ({
    localJobFam,
    localRole,
    localRoleLevel,
    localLmEmail,
  }) => {
    setRole(localRole);
    setRoleLevel(localRoleLevel);
    setJobFam(localJobFam);
    setLmEmail(localLmEmail);
  }

  return <Routes>
    <Route path="/submit-specialism"
      element={
          <Page {...{ ...pageText["submit"] }}>
            <SpecialismSpecificationForm
              allSpecialties={roles}
              onSubmit={onSubmitSpecialismSpecificationForm}
              {...{
                jobFam,
                role,
                roleLevel,
                setJobFam,
                setRole,
                setRoleLevel,
                specialism,
                lmEmail,
              }}
            />
          </Page>
        }
      />
      <Route path="/submit-skills"
        element={
          <Page {...{ ...pageText["submit"] }}>
            <SkillsForm
              {...{
                skills,
                jobFam,
                role,
                roleLevel,
                savedSkills,
                setSavedSkills,
              }
            }/>
          </Page>
        }
      />
      <Route path="/validate"
        element={
          <Page {...{ ...pageText["validate"] }}>
            <Validate />
          </Page>
        }
      />
  </Routes>
}

export default App
