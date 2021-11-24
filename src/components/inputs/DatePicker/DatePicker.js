import React from 'react'
import { IonDatetime } from '@ionic/react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import './DatePicker.scss'

const months = moment.months()

const DatePicker = ({ onChange, ...rest }) => {
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
        onIonChange={handleChange}
        displayFormat='DD MMMM YYYY'
        doneText={t('okay')}
        cancelText={t('cancel')}
        monthNames={months}
        className='input-datetime'
        {...rest}
      />
    </div>
  )
}

export default DatePicker
