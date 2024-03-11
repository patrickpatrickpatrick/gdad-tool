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

const Summary = ({ Completed, LineManagerApproved, Name, index }) => <div>
  <span
    id={`${nameToId(Name)}-${index}-completed`}
    style={{
      marginRight: "20px",
      color: Completed == "Yes" ? "green" : "red",
    }}
  >
    {
      Completed == "Yes" && "Completed" || "Not Completed"
    }
  </span>
  <span
    id={`${nameToId(Name)}-${index}-approved`}
    style={{
      color: LineManagerApproved == "Yes" ? "green" : "red",
    }}    
  >
    {
      LineManagerApproved == "Yes" && "Validated" || "Not Validated"
    }  
  </span>
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
      }, index) => {
        const completedSpan = accordionRef.current.querySelector(`#${nameToId(Name)}-${index}-completed`);
        const approvedSpan = accordionRef.current.querySelector(`#${nameToId(Name)}-${index}-approved`);

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
      {
        reportReturns && !!reportReturns.length &&
          <Accordion
            id={"accordion-default"}
            accordionRef={accordionRef}
            items={
              reportReturns.map(({
                Name,
                Completed,
                LineManagerApproved,
                PassedProbation,
                ...skillsAndRole
              }, index) => {

                return {
                  heading: getNameFromEmail(Name),
                  summary: <Summary {...{ LineManagerApproved, Completed, Name, index }} />,
                  content: <>
                    {
                      Completed ? <ValidateTable
                        {
                          ...{
                            ...skillsAndRole
                          }
                        }
                      /> : <Paragraph>
                        Not yet completed submission for validation.
                      </Paragraph>
                    }

                    { Completed &&
                      <ValidateForm
                        name={Name}
                        onSubmit={onSubmit}
                        validatedByLm={LineManagerApproved}
                        passedProbation={PassedProbation}
                      />
                    }
                  </>
                }
              })
            }
          />        
        }
        {
          reportReturns && !reportReturns.length && <Paragraph>
            No line reports to validate
          </Paragraph>
        }
    </>
  )
}

export default Validate;
