import { useState } from 'react';
import _styles from './MoneyInput.module.css'

interface MoneyInputProps {
  locale: string;
}

export default function MoneyInput({ locale }: MoneyInputProps) {
  const [value, setValue] = useState<number>(250)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(parseFloat(newValue))
  }

  const handleBlur = () => {
    const cents = Math.round(value * 100)
    console.log(cents)
  }


  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'en-US' ? 'USD' : 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)


  return (
    <div className={_styles.container}>
      <form>
        <label htmlFor="value">Label*</label>
          <input
            type="text"
            step="0.01"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formattedValue}
            required
          />
      </form>
    </div>
  )
}
