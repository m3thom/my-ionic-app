import { withFormik } from 'formik'
import Form from './UserSignUpForm'

import * as Yup from 'yup'
import { BaseFormikConfig } from 'forms/_baseForm'

const UserFormValidationSchema = Yup
   .object()
   .shape({
      user: Yup.object().shape({
         name: Yup.string().required('Name is required.'),
         email: Yup.string().email().required('Email is required.'),
         password: Yup.string().required('Password is required.'),
      })
   })

const UserFormikConfig = {
   ...BaseFormikConfig,
   mapPropsToValues: ({ data = {} }) => ({
      user: {
         name: data.name,
      }
   }),
   validationSchema: UserFormValidationSchema,
}


export default withFormik(UserFormikConfig)(Form)
