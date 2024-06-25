import nodemailer from "nodemailer";
import { Subscriber } from "../Models/Subscriber.js";
import ErrorHandler from "../utils/utility.js";

const newSubscribe = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorHandler("Chootiya", 401));
  const emailExist = await Subscriber.findOne({ email });
  if (emailExist)
    return next(new ErrorHandler("You Are Already Subscribed!", 400));

  const subscriber = await Subscriber.create({
    email,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: "NewsLetter",
    text: "Thanks For Subscribing Our NewsLetter!",
    html: `<!DOCTYPE html>
  <html>
  <head>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      .container {
        font-family: "Poppins", sans-serif;
        font-style: normal;
        background: linear-gradient(to bottom left, #18181b, #1e3a8a);
        width: 80%;
        margin: auto;
        padding: 2.5rem;
        color: white;
        text-align: center;
        border-radius: 30px;
        > p {
          width: 90%;
          margin: auto;
        }
        > a {
          display: inline-block;
          margin-top: 60px;
          padding: 5px;
          border-radius: 6px;
          border: 2px solid white;
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s;
          > span {
            position: relative;
            padding: 14px 20px;
            display: flex;
          }
        }
      }
      span::after {
        content: "";
        color: black;
        width: 100%;
        height: 100%;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        scale: 0;
        transition: all 0.3s;
      }
      a:hover > span::after {
        scale: 1;
      }
      a:hover {
        color: black;
      }
    </style>
  </head>
  <body>
    <div
      class="container text-center p-10 mx-auto flex rounded-3xl flex-col items-center justify-center text-white h-screen bg-gradient-to-bl from-zinc-900 to-blue-900"
    >
      <h1 class="text-3xl font-semibold mt-5">
        Thanks For Subscribing Our News Letter
      </h1>
      <h2 class="text-xl font-semibold mt-4">
        Coming Soon: Your Ultimate Component Library
      </h2>
      <p class="md:w-3/4 mx-auto tracking-tighter mt-10">
        We're excited to announce the upcoming launch of our comprehensive
        Component Library! Designed with efficiency in mind, our library offers
        a diverse range of pre-built, customizable components that will
        streamline your workflow and save you valuable time. Whether you're a
        developer looking to enhance your projects or a designer seeking
        seamless integrations, our library has something for everyone. Stay
        tuned for more updates and get ready to elevate your work with our
        intuitive, user-friendly components. Your next project just got a whole
        lot easier!
      </p>
      <a
        href="https://codewithraju.vercel.app/"
        class="inline-block mt-20 font-bold mx-auto border-2 p-1 rounded-md transition-all duration-300"
      >
        <span class=""> Contact Us </span>
      </a>
    </div>
  </body>
</html>

`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .send("Error sending newsletter. Please try again.");
    }
    res.status(200).send("Newsletter sent successfully!");
  });

  res.status(200).json({
    success: true,
    message: `News Letter Subscribed`,
  });
};

export { newSubscribe };
