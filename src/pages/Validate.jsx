import {
  Accordion,
  ValidateTable,
  ValidateForm,
} from './../components';
import { getNameFromEmail } from './../util';
import {
  Table,
  Heading,
  Button,
  Select,
  Paragraph,
} from 'govuk-react';
import { useRef, useEffect } from 'react';

const nameToId = name => name.replace(/\@|\./g, '')

const Summary = ({ Completed, LineManagerApproved, Name }) => <div>
  <span
    id={`${nameToId(name)}-completed`}
    style={{
      marginRight: "20px"
    }}
    completed={Completed == "Yes"}
  ></span>
  <span
    id={`${nameToId(name)}-approved`}
    completed={LineManagerApproved == "Yes"}
  ></span>
</div>

const Validate = ({
  reportReturns,
  onSubmit
}) => {
  const accordionRef = useRef();

  // horrifying workaround, sorry!!
  // this is because the accordion function regenerates the HTML
  // so refs for the spans won't work here :(
  // TODO: a native react accordion

  useEffect(() => {
    if (accordionRef.current) {
      reportReturns.forEach(({
        Name,
        Completed,
        LineManagerApproved,
      }) => {
        const completedSpan = accordionRef.current.querySelector(`#${nameToId(name)}-completed`);
        const approvedSpan = accordionRef.current.querySelector(`#${nameToId(name)}-approved`);

        if (completedSpan) {
          completedSpan.innerText = Completed == "Yes"
            && "Completed" || "Not Completed"
          completedSpan.style.color = Completed == "Yes" ? "green" : "red"
        }

        if (approvedSpan) {
          approvedSpan.innerText = LineManagerApproved == "Yes"
            && "Validated" || "Not Validated"
          approvedSpan.style.color = LineManagerApproved == "Yes" ? "green" : "red"
        }
      })
    }
  }, [reportReturns])

  return (
    <>
      <Accordion
        id={"accordion-default"}
        accordionRef={accordionRef}
        items={
          reportReturns.map(({
            Name,
            Completed,
            LineManagerApproved,
            ...skillsAndRole
          }) => {

            return {
              heading: getNameFromEmail(Name),
              summary: <Summary {...{ LineManagerApproved, Completed, Name }} />,
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
                  onSubmit={onSubmit}
                />
              </>
            }
          })
        }
      />
    </>
  )
}

export default Validate;
