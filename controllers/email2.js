let client = require('@sendgrid/mail')
const sendEmail2=(options)=>{
    client.setApiKey("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")

const message={
    to:options.email,
    from:'yasseen1998@outlook.com',
subject:options.subject,
text:options.message,
// html:options.token
}
client.send(message).then(res=>console.log('email sent'))
.catch((err)=>console.log(err))
}
module.exports=sendEmail2



