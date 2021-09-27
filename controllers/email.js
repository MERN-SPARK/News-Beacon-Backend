const nodemailer = require('nodemailer')

const sendEmail=  options=>{
// create transporte

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587 ,
  auth: {
    user: "eeaba6aa6c0324",
    pass: "418eec07bd9750"
  }
});
    //active gmail



// define the email option

var mailOptions = {
  from: '"Example Team" <from@example.com>',
  to: options.email,
  subject: options.subject,
  text: options.message,
  html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};


// actually send the email
transport.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});}
module.exports = sendEmail
