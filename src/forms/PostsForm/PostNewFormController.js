import { withFormik } from 'formik'
import Form from './PostNewForm'
import { BasePostFormikConfig } from './PostFormConstatnts'

export default withFormik(BasePostFormikConfig)(Form)
