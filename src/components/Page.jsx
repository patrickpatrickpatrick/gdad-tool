import CustomNav from './../components/CustomNav';
import { Heading, LeadParagraph, Page as GovUkPage, WarningText } from 'govuk-react';
import { useLocation } from 'react-router-dom'

const Page = ({
  children,
  heading,
  leadParagraph,
  completed,
  validated,
  loaded,
}) => {
  const location = useLocation();

  return (
    <GovUkPage header={<CustomNav completed={completed} />}>
      {
        loaded && !completed && location.pathname.match("submit") && <div
          className="govuk-!-margin-bottom-5"
        >
          <WarningText>
            You have saved your submission but you have not yet submitted it for validation by your line manager. Please remember to <a href="#submit-for-validation-button">submit for validation</a> otherwise your submission will not be counted!
          </WarningText>
        </div>
      }
      {
        validated && location.pathname.match("submit") && <div
          className="govuk-!-margin-bottom-5"
        >
          <WarningText>
            Your submission has been validated by your line manager. You can no longer make any changes but you can review your submission.
          </WarningText>
        </div>
      }
      {
        (completed && !validated) && location.pathname.match("submit") && <div
          className="govuk-!-margin-bottom-5"
        >
          <WarningText>
            You have submitted your return for validation by your line manager. Before they validate your submission, it is still possible to make and save changes. Be sure to let your line manager know you are changing your submission before they validate it!
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
  )
} 

export default Page;
