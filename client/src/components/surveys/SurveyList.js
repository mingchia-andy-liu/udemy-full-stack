import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurvey } from '../../actions'

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurvey()
    }

    renderSurveys() {
        return this.props.surveys.reverse().map((survey) => {
            return (
                <div className="card darken-1 blue-grey">
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent on: {new Date(survey.dateSent).toLocaleString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

const mapStateToProps = ({ surveys }) => {
    return {
        surveys
    }
}

export default connect(mapStateToProps, { fetchSurvey })(SurveyList)
