import { useState, useEffect } from 'react';
import {
  Select,
  Paragraph,
  Button,
  Spinner,
} from 'govuk-react';
import { getNameFromEmail } from './../util';

// to do
// form should say error if error occurs
// should not display if validated

const ValidateForm = ({
  name,
  onSubmit,
  passedProbation,
  validatedByLm,
}) => {
  const [status, setStatus] = useState({
    submitting: null,
    success: false,
    error: false,
  });
  const [localPassedProbation, setLocalPassedProbation] = useState("No");
  const [localValidatedByLm, setLocalValidatedByLm] = useState("No");

  const { submitting, success, error } = status;

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
          setStatus,
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
  </div>

  return <form>
    <Paragraph>
      Line manager validation for {getNameFromEmail(name)}
    </Paragraph>
    {
      submitting != null && <SubmittingStatus submitting={submitting} />
    }
    {
      (!submitting && success) && <Paragraph>
        Submission successful
      </Paragraph>
    }
    {
      (!submitting && error) && <Paragraph>
        Submission failed
      </Paragraph>
    }     
    {
      (submitting == null && validatedByLm != 'Yes') && <Form />
    }
    {
      validatedByLm == 'Yes' && <Paragraph>
        Submission has been validated.
      </Paragraph>
    }
  </form>
}

export default ValidateForm;
