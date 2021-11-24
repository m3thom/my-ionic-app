export const BaseFormikConfig = {
    handleSubmit: (values, { props }) => {
        props.onSubmit(values)
    }
}
