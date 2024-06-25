import { Blog } from "../Models/Blog.js";
import { Subscriber } from "../Models/Subscriber.js";
import nodemailer from "nodemailer";

const newBlog = async (req, res, next) => {
  const { title } = req.body;
  const subscribers = await Subscriber.find({});
  const emails = subscribers.map((sub) => sub.email).join(",");
  const blog = await Blog.create(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 80%;
        margin: auto;
        padding: 20px;
        background-color: #f4f4f4;
        border: 1px solid #dddddd;
        border-radius: 5px;
      }
      .header {
        background-color: #007BFF;
        color: white;
        padding: 10px;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .content {
        padding: 20px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777777;
        margin-top: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 0;
        background-color: #007BFF;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Our Newsletter</h1>
      </div>
      <div class="content">
        <h2>Hello, Subscriber!</h2>
        <p>We are excited to bring you the latest news and updates from our company. Here's what's new:</p>
        <ul>
          <li>Update 1: Description of the first update.</li>
          <li>Update 2: Description of the second update.</li>
          <li>Update 3: Description of the third update.</li>
        </ul>
        <p>For more details, visit our website:</p>
        <a href="https://yourwebsite.com" class="button">Visit Our Website</a>
      </div>
      <div class="footer">
        <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe here</a>.</p>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: process.env.MAIL,
    to: emails,
    subject: "New Blog",
    text: `Posted A New Blog ${title}`,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .send("Error sending newsletter. Please try again.");
    }
    res.status(200).send("Newsletter sent successfully!");
  });
  return res.status(200).json({
    success: true,
    message: "Blog Created",
  });
};

const allBlogs = async (req, res, next) => {
  const blogs = await Blog.find();
  return res.status(200).json({
    success: true,
    blogs,
  });
};

const singleBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  return res.status(200).json({
    success: true,
    blog,
  });
};

export { allBlogs, newBlog, singleBlog };
