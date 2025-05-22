// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// app.post("/contact", async (req, res) => {
//   const { name, email, message } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,//work8abhishek@gmail.com
//       pass: process.env.EMAIL_PASS,//onvq oenb igjn xukp
//     },
//   });

//   const mailOptions = {
//     from: email,
//     to:  process.env.EMAIL_USER,//"work8abhishek@gmail.com",
//     subject: `New Contact from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ success: true, message: `Thanks, ${name}! Your message has been sent to us.` });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.json({ success: false, message: "Sorry, there was an error sending your message." });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Contact Form Endpoint
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Secure Email Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Stored in .env file
      pass: process.env.EMAIL_PASS, // Stored in .env file
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: `Thanks, ${name}! Your message has been sent successfully.`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong. Please try again later.",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
