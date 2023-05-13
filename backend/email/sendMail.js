import nodemailer from 'nodemailer'




function sendEmail(pw, to, link){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hdcontractingpass@gmail.com',
          pass: pw
        }
      });
      
      var mailOptions = {
        from: 'hdcontractingpass@gmail.com',
        to: to,
        subject: 'Reset Password',
        text: `Here is Your link to reset password \n ${link}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
export default sendEmail