import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'
import { ISurvey } from '../../../../models/Survey'
const SurveyList = ({
  fetchSurveys,
  surveys,
}: {
  fetchSurveys: () => void
  surveys: ISurvey[]
}) => {
  
  useEffect(() => {
    fetchSurveys()
  })

  const renderSurveys = () => {
    return surveys.reverse().map((survey: ISurvey) => {
      const date = new Date(survey.dateSent || '').toLocaleDateString()
      return (
        <div className='card' key={survey._id}>
          <div className='card-content'>
            <span className='card-title'>{survey.title}</span>
            <p>{survey.body}</p>
            <p className='right'>Sent On:{date}</p>
          </div>
          <div className='card-action'>
            <button>Yes:{survey.yes}</button>
            <button>No:{survey.no}</button>
          </div>
        </div>
      )
    })
  }

  return <div>{renderSurveys()}</div>
}

const mapStateToProps = ({ surveys }: { surveys: ISurvey[] }) => {
  return { surveys }
}

export default connect(
  mapStateToProps,
  { fetchSurveys },
)(SurveyList)
