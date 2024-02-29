import {
  Accordion,
  ValidateTable
} from './../components';
import { getNameFromEmail } from './../util';
import {
  Table,
  Heading,
  Button,
  Select,
  Paragraph,
} from 'govuk-react';

const StatusText = ({ completed, children, style }) => <span
  style={{
    color: completed ? "green" : "red",
    ...style
  }}
>
  {
    children
  }
</span>

const ValidateForm = ({
  name
}) => <form>
  <Paragraph>
    Line manager validation for {getNameFromEmail(name)}
  </Paragraph>

  <Select
    label={"Passed probation"}
  >
    <option value="">Please select an option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </Select>

  <Select
    label={"Validated by line manager"}
  >
    <option value="">Please select an option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </Select>   

  <Button>
    Submit validation for {getNameFromEmail(name)}
  </Button>
</form>

const Validate = ({ reportReturns }) => <>
  <Accordion
    id={"accordion-default"}
    items={
      reportReturns.map(({
        Name,
        Completed,
        LineManagerApproved,
        ...skillsAndRole
      }) => ({
        heading: getNameFromEmail(Name),
        summary: <div>
          <StatusText style={{
            marginRight: "20px"
          }} completed={Completed == "Yes"}>
            {
              Completed == "Yes" && "Completed" || "Not Completed"
            }
          </StatusText>

          <StatusText completed={LineManagerApproved == "Yes"}>
            {
              LineManagerApproved == "Yes" && "Validated" || "Not Validated"
            }
          </StatusText>
        </div>,
        content: <>
          <ValidateTable
            {
              ...{
                ...skillsAndRole
              }
            }
          />
          <ValidateForm
            name={Name}
          />
        </>
      }))
    }
  />
</>

export default Validate;
