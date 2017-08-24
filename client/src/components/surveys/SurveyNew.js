import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import SurveyFrom from './SurveyForm'
import SurveyFromReview from './SurveyFormReview'

class SurveyNew extends Component {
    // babel pluged in to condense the state init
    state = { showFormReview: false }

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFromReview onCancel={() => {
                    this.setState({ showFormReview: false })
                }}/>
        }

        return <SurveyFrom onSurveySubmit={() => {
                this.setState({ showFormReview: true })
            }}/>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

// * We set the 'destroyOnUnmount' to false in the SurveyForm
// so when user clicks Next, the values won't get destroyed *
// ===
// The reason we want to tie this component to the 'surveyForm'
// is because we want to clear out the values if the user
// navigates away from SurveyNew
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew)
