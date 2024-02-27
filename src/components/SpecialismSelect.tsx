import { Select } from 'govuk-react';

const Options = ({ options, children }) => <>
  { children }
  {
    options.map(option =>
      <option key={option} value={option}>
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
}) => <Select
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
    <option value="">
      {`Choose a ${label}`}
    </option>
  </Options>
</Select>

export default SpecialismSelect;