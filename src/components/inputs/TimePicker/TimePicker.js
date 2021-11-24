import React from 'react'
import { IonDatetime } from '@ionic/react'
import { useTranslation } from 'react-i18next'

import './TimePicker.scss'

const TimePicker = ({ onChange, ...rest }) => {
  const { t } = useTranslation()

  const handleChange = (e) => {
    onChange && onChange(e.target.value)
  }

  return (
    <div
      className='date-picker-input-container'
      lines='none'
    >
      <IonDatetime
        displayFormat="HH:mm"
        doneText={t('okay')}
        cancelText={t('cancel')}
        onIonChange={handleChange}
        {...rest}
      />
    </div>
  )
}

export default TimePicker
