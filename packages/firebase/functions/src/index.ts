import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'

const config = {
  region: 'europe-west1',
}
const { email, password, recipient } = functions.config().gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  },
})
const format = (date: string) =>
  new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const onNewBugReport = functions
  .region(config.region)
  .firestore.document('bugReports/{uid}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data()

    try {
      await transporter.sendMail({
        from: `HappyPlants 🌵 <${email}>`,
        to: recipient,
        subject: `🐛 A new bug report has been created`,
        html: `<p>Hey! Someone just opened a new bug report:</p>
          <p><strong>ID:</strong> ${snapshot.id}</p>
          <p><strong>Created:</strong> ${format(data.created)}</p>
          <p><strong>Reporter:</strong> ${data.reportedBy.email} (${data.reportedBy.userId})</p>
          <p><strong>App Version:</strong> ${data.appVersion}</p>
          <p><strong>Description:</strong> <br>${data.description}</p>
          <p><strong>Device:</strong> ${JSON.stringify(data.deviceInfo, null, 2)}</p>`,
        attachments:
          data.screenshot === null
            ? []
            : [
                {
                  filename: `${data.createdAt}-bugreport.png`,
                  path: data.screenshot,
                },
              ],
      })
      console.log('Bug report send.')
    } catch (error) {
      console.error('There was an error while sending the email:', error)
    }

    return null
  })

export const onNewFeatureRequest = functions
  .region(config.region)
  .firestore.document('featureRequests/{uid}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data()

    try {
      await transporter.sendMail({
        from: `HappyPlants 🌵 <${email}>`,
        to: recipient,
        subject: `✨ A new feature has been requested!`,
        html: `<p>Hey! Someone just opened a new feature request:</p>
          <p><strong>ID:</strong> ${snapshot.id}</p>
          <p><strong>Created:</strong> ${format(data.created)}</p>
          <p><strong>Reporter:</strong> ${data.reportedBy.email} (${data.reportedBy.userId})</p>
          <p><strong>App Version:</strong> ${data.appVersion}</p>
          <p><strong>Description:</strong> <br>${data.description}</p>
          <p><strong>Device:</strong> ${JSON.stringify(data.deviceInfo, null, 2)}</p>`,
      })
      console.log('Feature request send.')
    } catch (error) {
      console.error('There was an error while sending the email:', error)
    }

    return null
  })
