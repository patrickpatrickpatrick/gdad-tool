import {
  Spinner
} from 'govuk-react';

const SpinnerText = ({ text }) => <div className="govuk-grid-row">
  <div className="govuk-grid-column-one-third">
    <Spinner
      fill="black"
      height="50px"
      width="50px"
    />
  </div>
  <div className="govuk-grid-column-two-thirds">
    <h1>{text}</h1>
  </div>
</div>

export default SpinnerText;