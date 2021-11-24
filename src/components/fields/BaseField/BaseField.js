import React from 'react'
import PropTypes from 'prop-types'
import { IonLabel, IonText } from '@ionic/react'
import { Field, ErrorMessage, getIn } from 'formik'
import { useTranslation } from 'react-i18next'

import Input from 'components/inputs/Input'

const BaseField = ({
  name,
  label,
  noLabel,
  required,
  disabled,
  render,
  noErrorMessagePlaceholder,
  Component,
  ...rest
}) => {
  const { t } = useTranslation('fields')

  const renderInput = ({ field, form }) => {
    if (render) {
      return render({ field, form })
    }
    else if (Component) {
      return (
        <Component
          {...field}
          error={getIn(form.touched, name) && getIn(form.errors, name)}
          onChange={value => form.setFieldValue(name, value)}
          onBlur={e => form.setFieldTouched(name, true)}
          disabled={disabled}
          required={required}
          {...rest}
        />
      )
    }
  }

  return (
    <Field name={name}>
      {(renderProps) => (
        <>
          {
            !noLabel && (
              <IonLabel
                className='field-label'
                color='primary'
              >
                {label || t(`label.${name}`)}
                {/* contente */}
              </IonLabel>
            )
          }

          {renderInput(renderProps)}

          <ErrorMessage
            name={name}
            render={(message) => (
              message ? <IonText className='error-message' color='danger'>{message}</IonText> : null
            )}
          />

          {
            !noErrorMessagePlaceholder && (
              <IonText className='error-message-placeholder'>.</IonText>
            )
          }

        </>
      )}
    </Field>
  )
}

BaseField.defaultProps = {
  Component: Input
}

BaseField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  noLabel: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  render: PropTypes.func,
  noErrorMessagePlaceholder: PropTypes.bool,
  Component: PropTypes.elementType
}

export default BaseField
