import { TryCatch } from "../Middlewares/Error.js";
import ErrorHandler from "../utils/utility.js";
import { Review } from "../Models/Review.js";

const newReview = TryCatch(async (req, res, next) => {
  const { comment, rating, user } = req.body;
  if (!comment || !rating || !user.name || !user.email)
    return next(new ErrorHandler("All Fields Are Required.", 401));
  await Review.create({ comment, rating, user });
  return res.status(200).json({
    success: true,
    message: "Thanks For Your Feedback",
  });
});

const allReviews = TryCatch(async (req, res, next) => {
  const reviews = await Review.find();
  return res.status(200).json({
    success: true,
    reviews,
  });
});

export { newReview, allReviews };
