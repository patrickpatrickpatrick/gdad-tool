import { useState, useEffect } from 'react'
import { LoadingBox, Panel, Spinner } from 'govuk-react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

import { Page } from './components';
import { 
  Validate,
  SpecialismSpecificationForm,
  PreviousYears,
  SubmitReturn,
  SuccessSubmit,
  SubmitSkills,
} from './pages';
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
  const [previousSubmits, setPreviousSubmits] = useState([]);

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
      setPreviousSubmits,
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
      ["Skills"]: JSON.stringify(reportReturns[indexOfReport]["Skills"]),
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
      {
        ...report,
        ["Skills"]: JSON.parse(report["Skills"]),
      },
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
    {
      [
        {
          path: "/",
          pageText: pageText["loading"]
        },
        {
          path: "/submit-specialism",
          pageText: pageText["submit"],
          children: <SpecialismSpecificationForm
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
              validated,
            }}
          />
        },
        {
          path: "/submit-skills",
          pageText: pageText["submit"],
          children: <SubmitSkills
            {
              ...{
                JobFamily: jobFam,
                Role: role,
                RoleLevel: roleLevel,
                Skills: savedSkills,
                skills,
                jobFam,
                role,
                roleLevel,
                savedSkills,
                setSavedSkills,
                errors,
                onSubmit,
              }
            }
          />
        },
        {
          path: "/validate",
          pageText: pageText["validate"],
          children: <Validate
            onSubmit={onSubmitLMReport}
            {
              ...{
                reportReturns
              }
            }
          />
        },
        {
          path: "/submitting",
          children: <SubmitReturn />
        },
        {
          path: "/previous-submits",
          children: <PreviousYears />
        },
        {
          path: "/success-submit",
          children: <SuccessSubmit {...{ validated, savedSkills }} />
        }
      ].map(({
        path,
        pageText,
        children
      }) => <Route key={path} {...{ path }}
        element={
            <Page {...{...pageText, completed, validated}}>
              {
                children
              }
            </Page>
          }
        />
      )
    }
  </Routes>
}

export default App
