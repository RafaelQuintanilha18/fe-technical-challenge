import { useState } from 'react';
import _styles from './MoneyInput.module.css'

interface MoneyInputProps {
  locale: string;
  isDisabled?: boolean;
  error?: boolean;
}

export default function MoneyInput({ locale, isDisabled, error }: MoneyInputProps) {
  const [value, setValue] = useState('0')
  const valueAsNumber = parseFloat(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const formattedValue = newValue.replace(/[^0-9.,]/g, '').replace(/(\..*)\./g, '$1').replace(/(,.*),/g, '$1').replace(',', '.');
    setValue(formattedValue);
  }

  const handleBlur = () => {
    const cents = isNaN(valueAsNumber) ? 0 : Math.round(valueAsNumber * 100);
    console.log(cents)
  }

  const formattedCurrency = isNaN(valueAsNumber) ? '' : new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'us' ? 'USD' : 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valueAsNumber);


  return (
    <div className={_styles.container}>
      <form>
        <label htmlFor="value">Label*</label>
          <input
            type="text"
            // step={0.01}
            // min={0}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            required
            disabled={isDisabled}
            className={error ? _styles.error : ''}
          />
          <span>{formattedCurrency}</span>
      </form>
    </div>
  )
}


















/* import { useState, useEffect } from 'react';
import _styles from './MoneyInput.module.css'

interface MoneyInputProps {
  locale: string;
}

export default function MoneyInput({ locale }: MoneyInputProps) {
  const [value, setValue] = useState<string>("0")
  const [formattedValue, setFormattedValue] = useState<string>()
  const parsedValue = parseFloat(value);

  useEffect(() => {

    if (isNaN(parsedValue)) {
      setFormattedValue('0');
    } else {
      const formatted = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: locale === 'us' ? 'USD' : 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(parsedValue);

      setFormattedValue(formatted);
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
  }

  const handleBlur = () => {
    const cents = Math.round(parsedValue * 100)
    console.log(cents)
  }


  return (
    <div className={_styles.container}>
      <form>
        <label htmlFor="value">Label*</label>
          <input
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            required
          />
          <span>Result: {formattedValue}</span>
      </form>
    </div>
  )
}
 */
