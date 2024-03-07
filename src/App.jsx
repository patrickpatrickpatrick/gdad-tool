import { useState, useEffect } from 'react'
import { LoadingBox, Panel, Spinner } from 'govuk-react'
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
  saveReport,
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
  const [success, setSuccess] = useState(false);
  const [specialism, setSpecialism] = useState(null);
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
      setCompleted,
      setValidated,
      navigate,
    }

    // dev mode
    if (typeof google !== 'undefined') {
      getData(parameters)
    } else {
      devGoogle(parameters)
    }
  }, []);

  const onSubmitLMReport = (
    name,
    passedProbation,
    validatedByLm,
    setSubmitting
  ) => {
    const indexOfReport = reportReturns.findIndex(x => x["Name"] == name);

    setSubmitting(true);

    const report = {
      ...reportReturns[indexOfReport],
      ["LineManagerApproved"]: validatedByLm,
      ["PassedProbation"]: passedProbation,
    }

    if (typeof google == 'undefined') {
      submitLMReportSuccess(
        report,
        setSubmitting,
      )();
    } else {
      saveReport(
        report,
        submitLMReportSuccess(
          report,
          setSubmitting,
        ),
      )
    }
  }

  const submitLMReportSuccess = (
    report,
    setSubmitting
  ) => () => {
    const indexOfReport = reportReturns.findIndex(x => x["Name"] == report["Name"]);

    setReportReturns([
      ...reportReturns.slice(0, indexOfReport),
      report,
      ...reportReturns.slice(indexOfReport + 1, reportReturns.length),
    ]);

    setSubmitting(false);
  }

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

      setSpecialism({
        ["Role"]: localRole,
        ["RoleLevel"]: localRoleLevel,
        ["JobFamily"]: localJobFam,
      })

      let frameworkFiltered = framework.filter((specialty) =>
        specialty['JobfamilyFILTER'] == localJobFam &&
        specialty['RoleFILTER'] == localRole &&
        specialty['RoleLevelFILTER'] == localRoleLevel
      )

      setSkills(frameworkFiltered)

      setSavedSkills(frameworkFiltered.reduce((acc, skill) => ({
        ...acc,
        [skill.SkillNameFILTER]: {
          "Evidence": "",
          "Score": "",
          "Comments": "",
        },
      }), {}));
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

      const onSubmit = onSuccess(toValidate);
      const params = {
        "JobFamily": jobFam,
        "Role": role,
        "RoleLevel": roleLevel,
        "LMEmail": lmEmail,
        "Skills": localSavedSkills,
        "Completed": toValidate ? "Yes" : "No",
      }

      navigate('/submitting')

      // dev mode
      if (typeof google == 'undefined') {
        saveDataSuccess(null, { onSubmit });
      } else {
        saveData(params, onSubmit);
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
            onSubmit={onSubmitLMReport}
            {
              ...{
                reportReturns
              }
            }
          />
        </Page>
      }
    />
    <Route path="/submitting"
      element={
        <Page>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-third">
              <Spinner
                fill="black"
                height="50px"
                title="Example Spinner implementation"
                width="50px"
              />
            </div>
            <div className="govuk-grid-column-two-thirds">
              <h1>Submitting your return, please wait...</h1>
            </div>
          </div>
        </Page>
      }
    />
    <Route path="/success-submit"
      element={
        <Page>
          <Panel
            title={
              !validated ?
                "Form Saved Successfully" : "Form Submitted for Validation"
            }
          >
            Your provisional score is {classifyScore(savedSkills)}
            <br/><br/>
            <Link to="/submit-skills">Click here to edit your submission</Link>
          </Panel>
        </Page>
      }
    />
  </Routes>
}

export default App
