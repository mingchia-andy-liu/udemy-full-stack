const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipient')

// recipients is a 'subDocument' collections

// _user sets up a relaitonship with the User model
// ref: is for references the User collection
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yse: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
})

mongoose.model('survey', surveySchema)
