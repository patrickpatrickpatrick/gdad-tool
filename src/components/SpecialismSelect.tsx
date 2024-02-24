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
  options
}) => <Select
  label={label}
  value={value}
  input={{
    onChange: (e) => {
      setValue(e.target.value);
    },
    disabled: disabled
  }}
>
  <Options options={options}>
    <option value="">
      {`Choose a ${label}`}
    </option>
  </Options>
</Select>

export default SpecialismSelect;