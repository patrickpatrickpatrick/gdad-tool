import { TextArea } from 'govuk-react';

const LimitTextArea = ({
  label,
  value,
  onChange,
  limit,
  error,
  id
}) => {
  return <div
    id={id}
    className={"govuk-!-margin-bottom-3"}
  >
    <TextArea
      hint={`No more than ${limit} characters`}
      input={{
        onChange,
        value,
        className: "govuk-!-margin-bottom-3"
      }}
      meta={{...(error ? {
        error: error,
        touched: true
      } : {})}}
    >
     {label}
    </TextArea>
    {
       (value.length <= limit) && <span>
        You have {limit - value.length} characters remaining.
      </span>
    }
    {
       (value.length > limit) && <span
        style={{ color: 'red' }}
       >
        You are {value.length - limit} characters over the limit.
      </span>
    }    
  </div> 
}

export default LimitTextArea;
