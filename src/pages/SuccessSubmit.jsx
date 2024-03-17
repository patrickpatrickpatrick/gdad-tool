import { Panel } from 'govuk-react';
import { Link } from 'react-router-dom';
import { classifyScore } from './../util';

const SuccessSubmit = ({
  validated,
  savedSkills,
}) => <Panel
    title={
      !validated ?
        "Form Saved Successfully" : "Form Submitted for Validation"
    }
  >
    Your provisional score is {classifyScore(savedSkills)}
    <br/><br/>
    <Link to="/submit-skills">Click here to edit your submission</Link>
  </Panel>

export default SuccessSubmit;