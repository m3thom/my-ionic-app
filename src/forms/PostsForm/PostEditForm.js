import { Form } from 'formik'
import BaseField from 'components/fields/BaseField';
import HiddenSubmitButton from 'components/HiddenSubmitButton';

const Index = ({ submitButtonRef }) => {

   return (
      <Form>
         <BaseField name='content' />

         <HiddenSubmitButton
            ref={submitButtonRef}
         />
      </Form>
   )
}

export default Index
