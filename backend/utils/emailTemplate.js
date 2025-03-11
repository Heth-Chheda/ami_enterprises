export function generateVerificationOtpEmailTemplate(otp) {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #4CAF50; text-align: center;">Verify Your Account</h2>
        <p>Hi!,</p>
        <p>Thank you for registering with us. Please use the following OTP to verify your account:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; background-color: #f4f4f4; padding: 12px 24px; font-size: 24px; font-weight: bold; color: #4CAF50; border: 1px solid #ddd; border-radius: 4px;">${otp}</span>
        </div>
        <p>This OTP will expire in <strong>10 minutes</strong>. If you didn’t request this, you can safely ignore this email.</p>
        <p style="margin-top: 30px;">Best regards,<br><strong>Ami Enterprises Team</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <footer style="font-size: 12px; color: #777; text-align: center;">
          © ${new Date().getFullYear()} Ami Enterprises. All rights reserved.
        </footer>
      </div>
    `;
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #4CAF50; text-align: center;">Reset Your Password</h2>
      <p>Hi,</p>
      <p>You requested to reset your password. Please click the button below to set a new password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetPasswordUrl}" style="display: inline-block; background-color: #4CAF50; color: #fff; padding: 12px 24px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 4px; border: none;">Reset Password</a>
      </div>
      <p>This link will expire in <strong>30 minutes</strong>. If you didn't request this, you can safely ignore this email.</p>
      <p style="margin-top: 30px;">Best regards,<br><strong>Ami Enterprises Team</strong></p>
      <p><strong>${resetPasswordUrl}</strong></p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <footer style="font-size: 12px; color: #777; text-align: center;">
        © ${new Date().getFullYear()} Ami Enterprises. All rights reserved.
      </footer>
    </div>
  `;
}
