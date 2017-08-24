// SurveyField contains the logic to render a single
// label and text input
import React from 'react'

// Redux-form injects props into the components
// input: event handlers
// meta: meta info of the input field
export default ({ label, input, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
}
