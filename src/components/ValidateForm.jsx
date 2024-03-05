import { useState, useEffect } from 'react';
import {
  Select,
  Paragraph,
  Button
} from 'govuk-react';
import { getNameFromEmail } from './../util';

const ValidateForm = ({
  name,
  onSubmit
}) => {
  const [passedProbation, setPassedProbation] = useState("");
  const [validatedByLm, setValidatedByLm] = useState("");

  return (<form>
    <Paragraph>
      Line manager validation for {getNameFromEmail(name)}
    </Paragraph>

    <div
      className="govuk-!-margin-bottom-3"
    >
      <Select
        label={"Passed probation"}
        input={{
          onChange: (e) => setPassedProbation(e.target.value),
          value: passedProbation
        }}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </Select>
    </div>

    <div
      className="govuk-!-margin-bottom-3"
    >
      <Select
        label={"Validated by line manager"}
        input={{
          onChange: (e) => setValidatedByLm(e.target.value),
          value: validatedByLm
        }}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </Select>
    </div>

    <Button
      disabled={
        !validatedByLm.length && !passedProbation.length
      }
      onClick={(e) => {
        e.preventDefault();
        onSubmit(
          name,
          passedProbation,
          validatedByLm,
        );
      }}
    >
      Submit validation for {getNameFromEmail(name)}
    </Button>
  </form>)
}

export default ValidateForm;
