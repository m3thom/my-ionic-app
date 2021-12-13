import { withFormik } from 'formik'
import Form from './UserSignInForm'

import * as Yup from 'yup'
import { BaseFormikConfig } from 'forms/_baseForm'

const UserFormValidationSchema = Yup
   .object()
   .shape({
      user: Yup.object().shape({
         email: Yup.string().required('Email is required.'),
         password: Yup.string().required('Password is required.'),
      })
   })

const UserFormikConfig = {
   ...BaseFormikConfig,
   mapPropsToValues: () => ({}),
   validationSchema: UserFormValidationSchema,
}


export default withFormik(UserFormikConfig)(Form)
