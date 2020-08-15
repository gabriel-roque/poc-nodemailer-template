require('dotenv').config();

const nodemailer = require('nodemailer');
const Email = require('email-templates');

// Config your transport email here
let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Configure Email-templates
const email = new Email({
  transport: transporter,
  message: {
    from: 'mail@gmail.com',
  },
  send: true, // enable send email in development (check variable process.env.NODE_ENV)
  preview: false, // if preview render email
  views: {
    root: `${__dirname}/emails`,
  },
});

// Send Email
email
  .send({
    template: 'hello',
    message: {
      to: 'mail@gmail.com',
      subject: 'Check your Account',
    },
    locals: {
      name: 'Gabriel',
    },
  })
  .then(() => console.log('Email has been sent!'));
