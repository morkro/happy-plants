import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'

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
  .region('europe-west1')
  .firestore.document('bug-reports/{uid}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data()

    try {
      await transporter.sendMail({
        from: `HappyPlants 🌵 <${email}>`,
        to: recipient,
        subject: `🐛 A new bug report has been created`,
        html: `<p>Hey!<br>Someone just opened a new bug report.</p>
          <p><strong>Report ID:</strong> ${snapshot.id}</p>
          <p><strong>Created:</strong> ${format(data.createdAt)}</p>
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Description:</strong> <br>${data.description}</p>`,
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
