import { useState, useEffect } from 'react'
import { Page, LoadingBox } from 'govuk-react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomNav from './components/CustomNav';
import { Submit, Validate } from './pages';

import 'normalize.css'

const processData = (d, dict) => {
  let { returns, framework, reportReturns } = JSON.parse(d);
  let { setLoading, setRoles } = dict;

  setLoading(false);
  setRoles(framework);
}

const App = () => {
  const [view, setView] = useState('/');
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([])

  const [jobFam, setJobFam] = useState("");
  const [role, setRole] = useState("");
  const [roleLevel, setRoleLevel] = useState("");

  useEffect(() => {
    if (typeof google !== 'undefined') {
      google.script.run
      .withSuccessHandler(processData)
      .withUserObject(
        {
          setLoading,
          setRoles,
        }
      )
      .getData();
    } else {
      fetch('/roleLevelData.json').then(
        response => response.json()
      ).then(data => {
        setLoading(false);
        setRoles(data);
      })
    }
  }, []);

  return <Router>
    <Page header={<CustomNav />}>
      <div aria-live="polite" aria-busy={loading}>
        <LoadingBox loading={loading}>
          <Routes>
            <Route path="/" element={
              !loading && <Submit 
                allSpecialties={roles}
                jobFam={jobFam}
                role={role}
                roleLevel={roleLevel}
                setJobFam={setJobFam}
                setRole={setRole}
                setRoleLevel={setRoleLevel}
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
