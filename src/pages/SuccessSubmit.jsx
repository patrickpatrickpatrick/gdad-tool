import { Panel } from 'govuk-react';
import { Link } from 'react-router-dom';
import { classifyScore } from './../util';

const SuccessSubmit = ({
  completed,
  savedSkills,
}) => <>
    <Panel
      title={
        !completed ?
          "Form Saved Successfully" : "Form Submitted for Validation"
      }
    >
    Your provisional score is {classifyScore(savedSkills)}
    <br/><br/>
  </Panel>
  <div
    className='link-edit-container'
  >
    <Link className="govuk-link link-edit" to="/submit-skills">Click here to edit your submission</Link>
  </div>
</>

export default SuccessSubmit;