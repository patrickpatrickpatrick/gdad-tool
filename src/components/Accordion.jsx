import { useEffect, useRef, useState } from 'react';
import { Accordion as AccordionJS } from 'govuk-frontend';

const Accordion = ({
  id,
  accordionRef,
  headingLevel,
  items,
  className,
  ...attributes  
}) => {
  const [ accordionInstance, setAccordionInstance ] = useState(null);
  const [ govukAccordion, setGovukAccordion ] = useState(null);

  // stops the accordion executing multiple times
  useEffect(() => {
    if (accordionRef.current.id != accordionInstance) {
      setAccordionInstance(accordionRef.current.id)
    }    
  }, [accordionRef])

  // stops the accordion executing multiple times
  useEffect(() => {
    if (accordionRef.current.id == accordionInstance && !govukAccordion) {
      setGovukAccordion(new AccordionJS(accordionRef.current))
    }
  }, [accordionInstance]);

  const HeadingLevel = headingLevel ? `h${headingLevel}` : 'h2';

  const innerHtml = items.map((item, index) => {
    if (!item) {
      return;
    }

    return (
      <div
        key={item.reactListKey || index}
        className='govuk-accordion__section'
      >
        <div className="govuk-accordion__section-header">
          <HeadingLevel className="govuk-accordion__section-heading">
            <span
              className="govuk-accordion__section-button"
              id={`${id}-heading-${index + 1}`}
            >
              {item.heading}
            </span>
          </HeadingLevel>
          {item.summary ? (
            <div
              className="govuk-accordion__section-summary govuk-body"
              id={`${id}-summary-${index + 1}`}
            >
              {item.summary}
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          id={`${id}-content-${index + 1}`}
          className="govuk-accordion__section-content"
          aria-labelledby={`${id}-heading-${index + 1}`}
        >
          {item.content}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div
        {...attributes}
        className={`govuk-accordion`}
        ref={accordionRef}
      >
        {innerHtml}
      </div>
    </div>
  );
}

export default Accordion;
