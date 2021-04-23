const nodemailer = require('nodemailer');

exports.handler = async function (event, _context) {
  let testAccount = await nodemailer.createTestAccount();
  const mailToName = event.queryStringParameters.name;
  const mailToEmail = event.queryStringParameters.email;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ishan Manandhar" <ishan@example.com>',
    to: `${mailToEmail}`,
    subject: 'Hello ✔',
    text: `Hello ${mailToName}`,
    html: `You have sucessfully added your email in our list. Your email is: ${mailToEmail}`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return {
    statusCode: 200,
    body: JSON.stringify({ previewURL: nodemailer.getTestMessageUrl(info) }),
  };
};
