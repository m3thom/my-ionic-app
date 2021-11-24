import React from 'react'
import PropTypes from 'prop-types'
import { IonInput, IonTextarea } from '@ionic/react'
import clsx from 'clsx'

// import './Input.scss'

const Input = ({
  value,
  onChange,
  onBlur,
  children,
  error,
  textarea,
  inputWrapperClassName,
  ...rest
}) => {
  const props = {
    ...rest,
    onIonChange: (e) => onChange(e.target.value),
    onIonBlur: onBlur,
    value
  }

  return (
    <div
      className={clsx(
        'input-container',
        'input-container--basic',
        Boolean(error) && 'input-container--error',
        inputWrapperClassName
      )}
      lines='none'
    >
      {textarea ? <IonTextarea {...props} /> : <IonInput {...props} />}

      {children}
    </div>
  )
}

Input.defaultProps = {
  value: ''
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.node,
  error: PropTypes.string,
  inputWrapperClassName: PropTypes.string,
  textarea: PropTypes.bool
}

export default Input
