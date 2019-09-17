// SurveyForm shows a form for a user to add input
import _ from 'lodash'
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

const SurveyForm = ({ handleSubmit }: any) => {
  const renderFields = () => {
    return _.map(formFields, ({ label, name }) => {
      return <Field key={name} component={SurveyField} label={label} name={name} />
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderFields()}
        <Link to='/surveys' className='red btn-flat white-text'>
          Cancel
        </Link>
        <button type='submit' className='teal btn-flat right white-text'>
          Next
          <i className='material-icons right'>done</i>
        </button>
      </form>
    </div>
  )
}

const validate = (values: any) => {
  const errors: any = {}

  errors.recipients = validateEmails(values.recipients || '')

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm)
