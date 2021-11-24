import React from 'react'
import PropTypes from 'prop-types'
import { IonSelect, IonSelectOption } from '@ionic/react'
import { useTranslation } from 'react-i18next'

import './Select.scss'

const Select = ({ value, onChange, options, header, required, ...rest }) => {
  const { t } = useTranslation()

  const handleChange = (e) => {
    onChange && onChange(e.target.value)
  }

  return (
    <div className='input-select-container'>
      <IonSelect
        value={value}
        onIonChange={handleChange}
        okText={t('okay')}
        cancelText={t('cancel')}
        interfaceOptions={{ header }}
        className='input-select'
        {...rest}
      >
        {
          options.map(({ label, value }) => (
            <IonSelectOption key={value} value={value}>
              {label}
            </IonSelectOption>
          ))
        }
      </IonSelect>

      <input
        required={required}
        value={value}
        style={{ opacity: 0, height: 0, position: 'absolute' }}
      />
    </div>
  )
}

Select.defaultProps = {
  options: []
}

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  options: PropTypes.array,
  header: PropTypes.string,
  required: PropTypes.bool
}

export default Select
