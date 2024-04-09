import { useRef, useEffect } from 'react';

const ErrorSummary = ({ errors }) => {
  const errorRef = useRef();

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView();
      errorRef.current.focus();  
    }
  }, [errorRef])

  return (<div ref={errorRef} className="govuk-error-summary" data-module="govuk-error-summary">
    <div role="alert">
      <h2 className="govuk-error-summary__title">
        There is a problem
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {
            errors.map(({ targetName, text }) => <li
              key={targetName}
            >
              <a href={`#${targetName}`}>{text}</a>
            </li>)
          }
        </ul>
      </div>
    </div>
  </div>)
}

export default ErrorSummary;
