import type { adminType } from "../../types/admin"

const SuccessfulAdminRegistrationHTML = (adminDetails: adminType) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #1a73e8; text-align: center;">Welcome to the PAX Romana KNUST Admin Platform!</h2>

            <p>Hey there ${adminDetails.firstName},</p>

            <p>
              We are thrilled to have you join our family! You have successfully been registered as an Admin, and we have set up your account for access to our platform.
            </p>

            <p>
              Below are your login details:
            </p>

            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="font-weight: bold;">Email:</td>
                <td>${adminDetails.email}</td>
              </tr>
              <tr>
                <td style="font-weight: bold;">Temporary Password:</td>
                <td style="color: #e53935;">${adminDetails.pwd_hash}</td>
              </tr>
            </table>

            <p>
              We highly recommend you change your password after logging in for the first time.
            </p>

            <div style="text-align: center;">
              <a href="https://pax-romana-knust.vercel.app/login/admin" style="display: inline-block; padding: 12px 20px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 5px;">
                Login to Your Account
              </a>
            </div>

            <p style="margin-top: 20px;">
              If you didn’t request this registration, please ignore this email or contact our support team immediately on <a href="https://t.me/churchill_av">Telegram</a>.
            </p>

            <p>
              Remember, with great power, comes great responsibility.
            </p>

            <p>Best regards,</p>
            <p>The PAX App Team</p>

            <footer style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; font-size: 12px; text-align: center; color: #777;">
              Pax Romana KNUST &bull; Kumasi, Ashanti Region, Ghana &bull;
                <p>Built by
                    <a
                        href="https://vintech-portfolio.vercel.app"
                        style="color: #1a73e8; text-decoration: underline; text-underline-offset: 8px">
                            VinTech
                    </a>
                </p>
            </footer>
          </div>
        </div>
    `
}

export default SuccessfulAdminRegistrationHTML