import {
  Spinner
} from 'govuk-react';

const SubmitReturn = () => <div className="govuk-grid-row">
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

export default SubmitReturn;