import CustomNav from './../components/CustomNav';
import { Heading, LeadParagraph, Page as GovUkPage } from 'govuk-react';

const Page = ({ children, heading, leadParagraph }) => <GovUkPage header={<CustomNav />}>
  <Heading>
    { heading }
  </Heading>
  <LeadParagraph>
    { leadParagraph }
  </LeadParagraph>
  {
    children
  }
</GovUkPage>

export default Page;