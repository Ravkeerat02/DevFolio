const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8008;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Replace the following with your actual email address and SMTP configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.USER_EMAIL,
    subject: "New Contact Form Submission",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
