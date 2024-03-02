import CustomNav from './../components/CustomNav';
import { Heading, LeadParagraph, Page as GovUkPage, WarningText } from 'govuk-react';

const Page = ({
  children,
  heading,
  leadParagraph,
  completed,
  validated
}) => <GovUkPage header={<CustomNav />}>
  {
    validated && <div
      className="govuk-!-margin-bottom-5"
    >
      <WarningText>
      Your submission has been validated by your line manager. You can no longer make any changes but you can review your submission.
      </WarningText>
    </div>
  }
  {
    (completed && !validated) && <div
      className="govuk-!-margin-bottom-5"
    >
      <WarningText>
        You have submitted your return for validation by your line manager. It is still possible to make and save changes but let your line manager know before they validate your submission!
      </WarningText>
    </div>
  }
  {
    heading && <Heading>
      { heading }
    </Heading>
  }
  {
    leadParagraph && <LeadParagraph>
      { leadParagraph }
    </LeadParagraph>
  }
  {
    children
  }
</GovUkPage>

export default Page;
