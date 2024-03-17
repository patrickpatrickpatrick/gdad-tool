import { Accordion, SkillsTable } from './../components';
import { Heading } from 'govuk-react'
import { useRef } from 'react';

const PreviousYears = ({
  returns22,
  returns23
}) => {
  const accordionRef = useRef();

  let items = [
    {
      heading: "Submission for 2022",
      ...returns22
    },
    {
      heading: "Submission for 2023",
      ...returns23
    }].filter(x => x["JobFamily"]).map(({
      heading,
      ...skillsAndRole
    }) => ({
        heading,
        content: <SkillsTable
          {
            ...{
              ...skillsAndRole
            }
          }
        />
      }
    ))

  return (
    <>
      {
        (!!items.length) && <Accordion
          accordionRef={accordionRef}
          items={items}
        />
      }
      {
        !items.length && <Heading>
          No previous submissions found
        </Heading>
      }
    </>
  )
} 

export default PreviousYears;