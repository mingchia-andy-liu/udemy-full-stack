const sendGrid = require('sendgrid')
const helper = sendGrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super()

        this.sgApi = sendGrid(keys.sendGridKey)
        this.from_email = new helper.Email('no-reply@fullstack.com')
        this.subject = subject
        this.recipients = this.formatAddresses(recipients)

        // setup the content
        this.body = new helper.Content('text/html', content)
        this.addContent(this.body)

        // setup click tracking
        this.addClickTracking()

        // setup adding recipients
        this.addRecipients()
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email)
        })
    }

    addClickTracking() {
        const trackSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true, true)

        trackSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackSettings)
    }

    addRecipients() {
        const personalize = new helper.Personalization()

        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient)
        })
        this.addPersonalization(personalize)
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        })

        const response = await this.sgApi.API(request)
        return response
    }
}

module.exports = Mailer
