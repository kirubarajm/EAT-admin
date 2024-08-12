import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
    Button
} from 'reactstrap';
import renderInputField from '../components/renderInputField'
import { required, maxLength15, minLength2, alphaNumeric, minLength5 } from '../utils/Validation'
import { load as loadAccount } from '../reducers/editmakeitform'

let EditMakeitForm = props => {
    const { handleSubmit,pristine, reset, submitting} = props
    // const handleLatlng = (lat1, lng1) => {
    //     props.change('lat', lat1);
    //     props.change('lon', lng1);
    // }

    return (
        <form onSubmit={handleSubmit}>
            <Field name="name" type="text" component={renderInputField} label="Username" validate={[required, maxLength15, minLength2]}
                warn={alphaNumeric} required={true} />
            <Field name="address" type="text" component={renderInputField} label="Address" validate={[required, minLength5]} required={true} />
            {/* <MapContainer className='mr-t-10' handleLatlng={handleLatlng} editMap={true} address={'You'} /> */}
            <Field name="lat" type="number" component={renderInputField} label="Latitude" validate={[required, minLength5]} required={true} />
            <Field name="lon" type="number" component={renderInputField} label="Longitude" validate={[required, minLength5]} required={true} />

            <div className='float-right'>
                <Button type="submit" disabled={pristine || submitting}>Submit</Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset} className='mr-l-10'>Clear</Button>
            </div>
        </form>
    )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditMakeitForm = reduxForm({
    form: 'initializeFromState' // a unique identifier for this form
})(EditMakeitForm)

// You have to connect() to any reducers that you wish to connect to yourself
EditMakeitForm = connect(
    state => ({
        initialValues: state.makeituser.viewmakeituser // pull initial values from account reducer
    }),
    { load: loadAccount } // bind account loading action creator
)(EditMakeitForm)

export default EditMakeitForm