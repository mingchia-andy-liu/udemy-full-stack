import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            )
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>
                </form>
            </div>
        )
    }
}

const validate = (values) => {
    const errors = {}

    errors.recipients = validateEmails(values.recipients || '')

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You much provide a value`
        }
    })

    return errors
}


// allows the form to connect the redux stores
export default reduxForm({
    validate,
    // has to be unique for redux's form to identify each form
    form: 'surveyForm',
    // keep the values even the component is unmounted
    destroyOnUnmount: false
})(SurveyForm)
