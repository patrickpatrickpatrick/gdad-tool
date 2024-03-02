import { useState, useEffect } from 'react'
import { LoadingBox, Panel } from 'govuk-react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

import { Page, ValidateTable } from './components';
import { SpecialismSpecificationForm, SkillsForm } from './pages/submit';
import { Validate } from './pages';
import { pageText } from './constants';

import {
  processData,
  getData,
  saveData,
  validateInput,
  devGoogle,
  classifyScore,
  saveDataSuccess,
} from './util';

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [framework, setFramework] = useState([])
  const [skills, setSkills] = useState([]);
  const [completed, setCompleted] = useState(false);

  const [success, setSuccess] = useState(false)

  const [specialism, setSpecialism] = useState(null)

  const [jobFam, setJobFam] = useState("");
  const [role, setRole] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [savedSkills, setSavedSkills] = useState({});
  const [lmEmail, setLmEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const [reportReturns, setReportReturns] = useState([]);

  const [errors, setErrors] = useState({});

  const onSuccess = toValidate => () => {
    navigate("/success-submit");
    if (toValidate) {
      setCompleted(true);
    }
  }

  useEffect(() => {
    navigate("/")

    const parameters = {
      setFramework,
      setRole,
      setJobFam,
      setRoleLevel,
      setSavedSkills,
      setSpecialism,
      setLmEmail,
      setReportReturns,
      setSkills,
      setLoading,
      navigate,
      setCompleted,
    }

    // dev mode
    if (typeof google !== 'undefined') {
      getData(parameters)
    } else {
      devGoogle(parameters)
    }
  }, []);

  const onSubmitSpecialismSpecificationForm = ({
    localJobFam,
    localRole,
    localRoleLevel,
    localLmEmail,
  }) => {
    if (
      (localJobFam !== jobFam) ||
      (localRole !== role) ||
      (localRoleLevel !== roleLevel)
    ) {
      setRole(localRole);
      setRoleLevel(localRoleLevel);
      setJobFam(localJobFam);

      setSkills(framework.filter((specialty) =>
        specialty['JobfamilyFILTER'] == jobFam &&
        specialty['RoleFILTER'] == role &&
        specialty['RoleLevelFILTER'] == roleLevel
      ))

      setSavedSkills({});
    }

    setLmEmail(localLmEmail);
  }

  const onSubmit = ({
    toValidate,
    localSavedSkills
  }) => {
    const validation = validateInput(localSavedSkills, skills);

    if (Object.keys(validation).length) {
      setErrors(validation)
    } else {
      setSavedSkills(localSavedSkills);

      const args = {
        submittedReturn: {
          "JobFamily": jobFam,
          "Role": role,
          "Role Level": roleLevel,
          "LMEmail": lmEmail,
          "Skills": savedSkills,
          "Completed": toValidate ? "Yes" : "No",         
        },
        onSubmit: onSuccess(toValidate),
      }

      // dev mode
      if (typeof google == 'undefined') {
        saveDataSuccess(...Object.values(args));
      } else {
        saveData(args);
      }
    }
  }

  return <Routes>
    <Route
      path="/"
      element={
        <LoadingBox loading={true}>
          <div aria-busy={loading} aria-live="polite" >
            <Page {...{...pageText["loading"]}} />
          </div>
        </LoadingBox>
      }
    />
    <Route path="/submit-specialism"
      element={
        <Page {...{ ...pageText["submit"], completed }}>
          <SpecialismSpecificationForm
            onSubmit={onSubmitSpecialismSpecificationForm}
            {...{
              framework,
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
        <Page {...{ ...pageText["submit"], completed, validated }}>
          {
            validated ? <ValidateTable
              {
                ...{
                  JobFamily: jobFam,
                  Role: role,
                  RoleLevel: roleLevel,
                  Skills: savedSkills
                }
              }
            /> : <SkillsForm
              {...{
                skills,
                jobFam,
                role,
                roleLevel,
                savedSkills,
                setSavedSkills,
                errors,
                onSubmit,
              }
            }/>
          }
        </Page>
      }
    />
    <Route path="/validate"
      element={
        <Page {...{ ...pageText["validate"] }}>
          <Validate
            {
              ...{
                reportReturns
              }
            }
          />
        </Page>
      }
    />
    <Route path="/success-submit"
      element={
        <Page>
          <Panel
            title={
              !validated ? "Form Saved Successfully" : "Form Submitted for Validation"
            }
          > 
            Your provisional score is {classifyScore(savedSkills)}
            <br/><br/>
            <Link to="/submit-specialism">Click here to edit your submission</Link>
          </Panel>
        </Page>
      }
    />
  </Routes>
}

export default App
