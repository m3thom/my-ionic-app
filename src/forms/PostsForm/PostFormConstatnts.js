import * as Yup from 'yup'
import { BaseFormikConfig } from 'forms/_BaseForm'

export const PostFormValidationSchema = Yup
    .object()
    .shape({
        content: Yup.string().required('Content is required.'),
    })

export const BasePostFormikConfig = {
    ...BaseFormikConfig,
    mapPropsToValues: ({ data = {} }) => ({
        content: data.content,
    }),

    validationSchema: PostFormValidationSchema,
}
