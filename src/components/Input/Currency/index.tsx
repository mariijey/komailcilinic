import { forwardRef } from 'react';
import { NumericFormat, InputAttributes } from 'react-number-format';

interface CurrencyInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const CurrencyInput = forwardRef<InputAttributes, CurrencyInputProps>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});

export default CurrencyInput;
