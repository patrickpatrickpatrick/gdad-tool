import { useState, useEffect } from 'react';
import {
  Select,
  Paragraph,
  Button,
  Spinner,
} from 'govuk-react';
import { getNameFromEmail } from './../util';

const ValidateForm = ({
  name,
  onSubmit
}) => {
  const [submitting, setSubmitting] = useState(null);
  const [passedProbation, setPassedProbation] = useState("");
  const [validatedByLm, setValidatedByLm] = useState("");

  const Form = () => <>
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
      onClick={(e) => {
        e.preventDefault();
        onSubmit(
          name,
          passedProbation,
          validatedByLm,
          setSubmitting,
        );
      }}
    >
      Submit validation for {getNameFromEmail(name)}
    </Button>
  </>

  const SubmittingStatus = ({ submitting }) => <div
    className="govuk-grid-row"
  >
    {
      submitting && <>
        <Spinner
          fill="black"
          height="50px"
          title="Example Spinner implementation"
          width="50px"
        />
        <Paragraph>
          Submitting validation...
        </Paragraph>
      </>
    }
    {
      !submitting && <Paragraph>
        Submission successful
      </Paragraph>
    }
  </div>

  return <form>
    <Paragraph>
      Line manager validation for {getNameFromEmail(name)}
    </Paragraph>
    {
      submitting != null && <SubmittingStatus submitting={submitting} />
    }
    {
      !submitting && <Form />
    }    
  </form>
}

export default ValidateForm;
