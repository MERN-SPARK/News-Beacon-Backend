let client = require('@sendgrid/mail')
const sendEmail2=(options)=>{
    client.setApiKey("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")

const message={
    to:options.email,
    from:'Yasseenkouthe@ENG.HU.EDU.JO',
subject:options.subject,
text:options.message,
// html:options.token
}
client.send(message).then(res=>console.log('email sent'))
.catch((err)=>console.log(err))
}
module.exports=sendEmail2



