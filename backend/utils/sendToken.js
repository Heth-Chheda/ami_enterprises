export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  //   console.log("Generated Token:", token);
  if (!token) {
    throw new Error("Failed to generate token.");
  }

  if (!process.env.COOKIE_EXPIRY) {
    throw new Error("COOKIE_EXPIRY is not defined.");
  }
  res
    .status(statusCode)
    .cookie("token", token, {
      expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      token,
      user_id: user._id,
    });
};
