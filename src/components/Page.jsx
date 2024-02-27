import CustomNav from './../components/CustomNav';
import { Heading, LeadParagraph, Page as GovUkPage } from 'govuk-react';

const Page = ({ children, heading, leadParagraph }) => <GovUkPage header={<CustomNav />}>
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