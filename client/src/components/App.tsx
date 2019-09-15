import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

const App = ({ fetchUser }: any) => {
  useEffect(() => {
    fetchUser()
  })

  return (
    <BrowserRouter>
      <div className='container'>
        <div>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/surveys' component={Dashboard} />
          <Route path='/surveys/new' component={SurveyNew} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default connect(
  null,
  { fetchUser },
)(App)
