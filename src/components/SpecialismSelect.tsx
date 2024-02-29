import { Select } from 'govuk-react';

const Options = ({ options, children }) => <>
  { children }
  {
    options.map((option, index) =>
      <option key={`${option}-${index}`} value={option}>
        {option}
      </option>
    )
  }
</>

const SpecialismSelect = ({
  label,
  setValue,
  value,
  disabled,
  options,
  inputRef,
}) => <div className={"govuk-!-margin-bottom-3"}>
<Select
  label={label}
  input={{
    onChange: (e) => {
      setValue(e.target.value);
    },
    ref: inputRef,
    disabled,
    value,
  }}
>
  <Options options={options}>
    <option key="none" value="">
      {`Choose a ${label}`}
    </option>
  </Options>
</Select>
</div>

export default SpecialismSelect;