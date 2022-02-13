const nodemailer = require("nodemailer");
//email gride logins
e_service = process.env.EMAIL_SERVICE;
e_username = process.env.EMAIL_USERNAME;
e_password = process.env.EMAIL_PASSWORD;

//email
e_from = process.env.EMAIL_FROM;

const resetEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: e_service,
    auth: {
      user: e_username,
      pass: e_password,
    },
  });

  const mailOptions = {
    from: e_from,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
module.exports = resetEmail;
