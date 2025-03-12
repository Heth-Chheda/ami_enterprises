import ErrorHandler from "./errorMiddleware.js";

export const verifyAdmin = (req, res, next) => {
  if (req.user.user_role != "admin") {
    return next(
      new ErrorHandler("You do not have the rights to access it.", 403)
    );
  }
  next();
};
