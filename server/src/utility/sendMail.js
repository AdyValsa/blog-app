const dev = require("../config");
const nodemailer = require("nodemailer");
const sendEmailWithNodeMailer = async (emailData) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: dev.app.smtpUser, // generated ethereal user
        pass: dev.app.smtpPass, // generated ethereal password
      },
    });
    const mailOptions = {
      from: dev.app.smtpUser, // sender address
      to: emailData.email, // list of receiver
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };
    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("-------SMTP ERROR1-------");
        console.log(error);
      } else {
        console.log("Verification link sent: %s", info.response);
      }
    });
  } catch (error) {
    console.log("-------SMTP ERROR2-------", error);
  }
};

module.exports = sendEmailWithNodeMailer