const _ = require('lodash')
const Path = require('path-parser')
// default from node
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplate/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = (app) => {
    app.get(
        '/api/surveys',
        requireLogin,
        async (req, res) => {
            const surveys = await Survey
                .find({ _user: req.user.id })
                .select({ recipients: false })
            res.send(surveys)
        }
    )


    app.get('/api/surveys/:id/:choice', (req, res) => {
        res.send('Thank you for voting')
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        // parse the routes
        const parser = new Path('/api/surveys/:surveyId/:choice')

        // advanced lodash `chain` functions
        // since we are using the result of each lodash funcitons
        _.chain(req.body)
            .map(({ url, email }) => {
                const match = parser.test(new URL(url).pathname)
                if (match) {
                    console.log(`email is ${email}`)
                    console.log(`surveyId is ${match.surveyId}`)
                    console.log(`choice is ${match.choice}`)
                    return {
                        surveyId: match.surveyId,
                        choice: match.choice,
                        email
                    }
                }
            })
            .compact() // remove any undefined objects
            .uniqBy('email', 'surveyId')
            .each(({ email, choice, surveyId }) => {
                // we dont assign as async because we are not responding to
                // SendGrid, since it's a webhook
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        // the $ refers to the entry found in `$elemMatch`
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec()
            })
            .value()
        res.send({})
    })

    app.post(
        '/api/surveys',
        requireLogin,
        requireCredits,
        async (req, res) => {
            const { title, subject, body, recipients } = req.body

            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients.split(',').map((email) => {
                    return {
                        email: email.trim()
                    }
                }),
                _user: req.user.id,
                dateSent: Date.now()
            })

            // send it to the mailer
            const mailer = new Mailer(survey, surveyTemplate(survey))

            try {
                await mailer.send()
                await survey.save()
                req.user.credits -= 1
                const user = await req.user.save()
                res.send(user)
            } catch(error) {
                res.status(422).send(error)
            }
        }
    )
}
