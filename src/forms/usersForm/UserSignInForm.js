import { Form } from 'formik'
import { useTranslation } from 'react-i18next'
import BaseField from 'components/fields/BaseField';
import HiddenSubmitButton from 'components/HiddenSubmitButton';

const Index = ({ submitButtonRef }) => {

    const { t } = useTranslation('users')

    return (
        <Form>
            <BaseField
                name='user.email'
                label={t('email')}
            />

            <BaseField
                type="password"
                name='user.password'
                label={t('password')}
            />

            <HiddenSubmitButton
                ref={submitButtonRef}
            />
        </Form>
    )
}

export default Index
