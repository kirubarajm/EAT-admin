
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Button
} from 'reactstrap';
import renderInputField from './renderInputField'
import { required, maxLength60, minLength2, phoneNumber, alphaNumeric, aol, email, passwordValidate } from '../utils/Validation'
import { EAT_REGISTRATION_FORM } from '../utils/constant';

const AddVirtualForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderInputField} label="Username" validate={[required, maxLength60, minLength2]}
        warn={alphaNumeric} />
      <Field name="email" type="email" component={renderInputField} label="Email" validate={[required, email]}
        warn={aol} />
      <Field name="phoneno" type="number" component={renderInputField} label="Phone Number" validate={[required, phoneNumber]} maxLength={10}/>
      <Field name="password" type="password" component={renderInputField} label="Password" validate={[required, passwordValidate]} />
      <div className='float-right'>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset} className='mr-l-10'>Clear</Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: EAT_REGISTRATION_FORM,  // a unique identifier for this form
})(AddVirtualForm)