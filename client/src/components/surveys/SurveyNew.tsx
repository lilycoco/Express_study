// SurveyNew shows SurveyForm and SurveuFormReview
import React, { useState } from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false)

  const renderContent = () => {
    if (showFormReview) {
      return <SurveyFormReview onCancel={() => setShowFormReview(false)} />
    }
    return <SurveyForm onSubmit={() => setShowFormReview(true)} />
  }
  return <div>{renderContent()}</div>
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew)
