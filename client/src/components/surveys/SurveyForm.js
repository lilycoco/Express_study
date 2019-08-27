// SurveyForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

const FIELDS = [
  {label: "Survey TItle", name: "title"},
  {label: "Subject Line", name: "subject"},
  {label: "Emily Body", name: "body"},
  {label: "Recipient List", name: "emails"},

]
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({label, name}) => {
      return <Field key={name} component={SurveyField} label={label} name={name}/>
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "reduxForm"
})(SurveyForm);
