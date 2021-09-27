let client = require('@sendgrid/mail')
const sendEmail = require('./email')



const sendEmail2=(options)=>{
    client.setApiKey("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")

const message={
    to:options.email,
    from:'Koute47@gmail.com',
subject:options.subject,
text:options.message,
html:options.token
}
client.send(message).then(res=>console.log('email sent'))
.catch((err)=>console.log(err))
}
module.exports=sendEmail2





   
//     var transpor = client.send({

//     to:{
//         email:'koute47@gmail.com',
//         name:'yaseen'
//     },
    
//     from:{
//         email:'Yasseenkouthe@ENG.HU.EDU.JO',
//         name:'hassan'
//     },
//     templateId:'d-fde60ae9adec44fb94baa713cf7d3ec6 ',
// dynamicTemplateData:{
//     name:"yaseen!!"
// }
// }).then(()=>{
//     console.log("email was sent");
// })}
// module.exports=sendEmail2
