
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Button
} from 'reactstrap';
import MapContainer from './MapContainer'
import renderInputField from './renderInputField'
import { required, maxLength160, minLength2, phoneNumber, alphaNumeric, aol, email, passwordValidate, minLength5, maxLength6 } from '../utils/Validation'
import { MAKEIT_REGISTRATION_FORM } from '../utils/constant';


let AddMakeitVirtualForm = (props) => {
  const { handleSubmit, pristine, reset, submitting,ZoneData} = props
  const handleLatlng = (lat1, lng1) => {
    props.change('lat', lat1);
    props.change('lon', lng1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderInputField} label="Username" validate={[required, maxLength160, minLength2]}
        warn={alphaNumeric} required={true}/>
      <Field name="email" type="email" component={renderInputField} label="Email" validate={[required, email]}
        warn={aol} required={true}/>
      <Field name="phoneno" type="number" component={renderInputField} label="Phone Number" validate={[required, phoneNumber]} required={true} maxLength={10}/>
      <Field name="password" type="password" component={renderInputField} label="Password" validate={[required, passwordValidate]} required={true}/>
      <Field name="address" type="text" component={renderInputField} label="Address" validate={[required, minLength5]} required={true}/>
      <MapContainer className='mr-t-10' handleLatlng={handleLatlng} editMap={true} address={'You'} clocation={true} zonearea={ZoneData}/>
          <Field name="lat" type="number" component={renderInputField} label="Latitude" validate={[required, minLength5]} required={true}/>
          <Field name="lon" type="number" component={renderInputField} label="Longitude" validate={[required, minLength5]} required={true}/>
          <Field name="pincode"  type="number" component={renderInputField} label="Pincode" validate={[required, maxLength6]} required={true}/>

      <div className='float-right'>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset} className='mr-l-10'>Clear</Button>
      </div>
    </form>
  )
}

AddMakeitVirtualForm = reduxForm({
  form: MAKEIT_REGISTRATION_FORM,  // a unique identifier for this form
})(AddMakeitVirtualForm)


export default AddMakeitVirtualForm;