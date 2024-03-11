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
  onSubmit,
  passedProbation,
  validatedByLm,
}) => {
  const [submitting, setSubmitting] = useState(null);
  const [localPassedProbation, setLocalPassedProbation] = useState("No");
  const [localValidatedByLm, setLocalValidatedByLm] = useState("No");

  useEffect(() => {
    setLocalPassedProbation(passedProbation);
    setLocalValidatedByLm(validatedByLm);
  }, [passedProbation, validatedByLm])

  const Form = () => <>
    <div
      className="govuk-!-margin-bottom-3"
    >
      <Select
        label={"Passed probation"}
        input={{
          onChange: (e) => setLocalPassedProbation(e.target.value),
          value: localPassedProbation
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
          onChange: (e) => setLocalValidatedByLm(e.target.value),
          value: localValidatedByLm
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
          localPassedProbation,
          localValidatedByLm,
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
