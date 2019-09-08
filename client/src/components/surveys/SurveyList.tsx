import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

const SurveyList = ({ fetchSurveys, surveys }: any) => {
  useEffect(() => {
    fetchSurveys()
  })

  const renderSurveys = () => {

    return surveys
      .reverse()
      .map(
        (survey: {
          _id: string | number | undefined
          title: React.ReactNode
          body: React.ReactNode
          dateSent: string | number | Date
          yes: React.ReactNode
          no: React.ReactNode
        }) => {
          const date = new Date(survey.dateSent).toLocaleDateString()
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
        },
      )
  }

  return <div>{renderSurveys()}</div>
}

const mapStateToProps = ({ surveys }: any) => {
  return { surveys }
}

export default connect(
  mapStateToProps,
  { fetchSurveys },
)(SurveyList)
