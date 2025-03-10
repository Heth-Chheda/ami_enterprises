import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res) {
  try {
    const message = generateVerificationOtpEmailTemplate(verificationCode);
    await sendEmail({
      email,
      subject: "Account Verification Code",
      message,
    });
    if (res.headersSent) return; // <-- Add this check
    res.status(200).json({
      success: true,
      message: `Verification Code sent successfully !`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send verification code",
    });
  }
}
