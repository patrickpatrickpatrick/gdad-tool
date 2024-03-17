import { useEffect, useState } from 'react';
import {
  SpecialismSpecificationForm,
  ErrorSummary,
} from './../components'; 

const SpecialismSpecification = (props) => {
  const [ errors, setErrors ] = useState(null);
  return <>
    {
      errors && <ErrorSummary errors={errors} />
    }
    <SpecialismSpecificationForm
      {
        ...{
          ...props,
          setErrors,
        }
      }
    />
  </>
}

export default SpecialismSpecification;