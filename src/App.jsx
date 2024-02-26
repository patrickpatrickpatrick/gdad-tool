import { useState, useEffect } from 'react'
import { Page, LoadingBox } from 'govuk-react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import CustomNav from './components/CustomNav';
import { Submit, Validate } from './pages';

import 'normalize.css'

const processData = (d, dict) => {
  let { returns, framework, reportReturns } = JSON.parse(d);

  console.log(returns)

  let {
    setLoading,
    setRoles,
    setJobFam,
    setRole,
    setRoleLevel,
    setSavedSkills
  } = dict;

  setRoles(framework);
  setRole(returns[0]["Role"]);
  setJobFam(returns[0]["JobFamily"]);
  setRoleLevel(returns[0]["RoleLevel"]);
  setSavedSkills(JSON.parse(returns[0]["Skills"]));

  console.log('loaded...')

  setLoading(false);
}

const App = () => {
  const [view, setView] = useState('/');
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([])

  const [jobFam, setJobFam] = useState("");
  const [role, setRole] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [savedSkills, setSavedSkills] = useState({});

  useEffect(() => {
    if (typeof google !== 'undefined') {
      google.script.run
      .withSuccessHandler(processData)
      .withUserObject(
        {
          setLoading,
          setRoles,
          setJobFam,
          setRole,
          setRoleLevel,
          setSavedSkills,
        }
      )
      .getData();
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
        })
      })
    }

    // to make it work :(
    window.history.pushState({}, "", '/')
  }, []);

  return <Router>
    <Page header={<CustomNav />}>
      <div aria-live="polite" aria-busy={loading}>
        <LoadingBox loading={loading}>
          <Routes>
            <Route path="/" element={
              <Submit
                allSpecialties={roles}
                jobFam={jobFam}
                role={role}
                roleLevel={roleLevel}
                setJobFam={setJobFam}
                setRole={setRole}
                setRoleLevel={setRoleLevel}
                savedSkills={savedSkills}
                setSavedSkills={setSavedSkills}
                loading={loading}
              />
            }/>
            <Route path="/validate" element={<Validate />}/>
          </Routes>
        </LoadingBox>
      </div>
    </Page>
  </Router>
}

export default App
