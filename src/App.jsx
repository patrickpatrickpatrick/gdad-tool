import { useState, useEffect } from 'react'
import { LoadingBox, Panel } from 'govuk-react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

import { Page } from './components';
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
} from './util';

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([])
  const [skills, setSkills] = useState([]);

  const [success, setSuccess] = useState(false)

  const [specialism, setSpecialism] = useState(null)

  const [jobFam, setJobFam] = useState("");
  const [role, setRole] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [savedSkills, setSavedSkills] = useState({});
  const [lmEmail, setLmEmail] = useState("");
  const [validate, setValidate] = useState(false);

  const [reportReturns, setReportReturns] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (success) {
      navigate("/success-submit")
    }
  }, [success])

  useEffect(() => {
    navigate("/")

    const parameters = {
      setRoles,
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
    }

    if (typeof google !== 'undefined') {
      getData(parameters)
    } else {
      devGoogle(...Object.values(parameters))
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

      setSkills(roles.filter((specialty) =>
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

      saveData(
        {
          jobFam,
          role,
          roleLevel,
          lmEmail,
          savedSkills
        },
        toValidate,
        () => { 
          setSuccess(true);
          setValidate(toValidate);
        }
      );
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
              errors,
              onSubmit,
            }
          }/>
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
    <Route path="/success"
      element={
        <Page>
          <Panel
            title={
              !validate ? "Form Saved Successfully" : "Form Submitted for Validation"
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
