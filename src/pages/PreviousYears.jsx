import { Accordion, SkillsTable } from './../components';
import { Paragraph } from 'govuk-react'
import { useRef } from 'react';

const PreviousYears = ({
  returns22,
  returns23
}) => {
  const accordionRef = useRef();

  let items = [
    {
      heading: "Submission for 2023",
      ...returns23
    },
    {
      heading: "Submission for 2022",
      ...returns22
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
        !items.length && <Paragraph>
          No previous submissions found
        </Paragraph>
      }
    </>
  )
} 

export default PreviousYears;