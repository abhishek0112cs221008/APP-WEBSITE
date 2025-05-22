const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "work8abhishek@gmail.com",
      pass: "onvq oenb igjn xukp",
    },
  });

  const mailOptions = {
    from: email,
    to: "work8abhishek@gmail.com",
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send(`<h3>Thanks, ${name}! Your message has been sent to us.</h3>`);
  } catch (error) {
    console.error("Error sending email:", error);
    res.send("<h3>Sorry, there was an error sending your message.</h3>");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
