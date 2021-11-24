import { withFormik } from 'formik'
import Form from './PostEditForm'
import { BasePostFormikConfig } from './PostFormConstatnts'

export default withFormik(BasePostFormikConfig)(Form)
