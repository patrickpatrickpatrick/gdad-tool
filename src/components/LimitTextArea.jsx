import { TextArea } from 'govuk-react';
import { useEffect } from 'react'

const LimitTextArea = ({
  label,
  value,
  onChange,
  limit
}) => {

  return <>
    <TextArea input={{
      onChange
    }}>
     {label}
    </TextArea>
    {
       (value.length <= limit) && <span>
        You have {limit - value.length} characters remaining.
      </span>
    }
    {
       (value.length > limit) && <span>
        You are {value.length - limit} characters over the limit.
      </span>
    }    
  </> 
}

export default LimitTextArea;