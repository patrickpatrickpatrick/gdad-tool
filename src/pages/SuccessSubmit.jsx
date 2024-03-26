import { Panel } from 'govuk-react';
import { Link } from 'react-router-dom';
import { classifyScore } from './../util';

const SuccessSubmit = ({
  validated,
  savedSkills,
}) => <>
    <Panel
      title={
        !validated ?
          "Form Saved Successfully" : "Form Submitted for Validation"
      }
    >
    Your provisional score is {classifyScore(savedSkills)}
    <br/><br/>
  </Panel>
  <Link to="/submit-skills">Click here to edit your submission</Link>
</>

export default SuccessSubmit;