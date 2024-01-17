const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Replace the following with your actual email address and SMTP configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ravkeerat.singh02@gmail.com",
      //   pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "ravkeerat.singh02@gmail.com",
    subject: "New Contact Form Submission",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error sending email" });
    }

    console.log("Email sent: " + info.response);
    res.json({ success: true, message: "Email sent successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
