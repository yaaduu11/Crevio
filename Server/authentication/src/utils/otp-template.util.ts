export function generateOtpHtmlTemplate(otp: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
          }
          .header {
            background: #4a90e2;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
          }
          .content {
            padding: 30px;
            text-align: center;
            color: #333333;
          }
          .otp {
            display: inline-block;
            font-size: 36px;
            font-weight: bold;
            color: #4a90e2;
            letter-spacing: 8px;
            background: #f4f4f9;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background: #f4f4f9;
            color: #666666;
            font-size: 14px;
          }
          .footer a {
            color: #4a90e2;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Your OTP Code
          </div>
          <div class="content">
            <p>Dear User,</p>
            <p>Your One-Time Password (OTP) is:</p>
            <div class="otp">${otp}</div>
            <p>Please use this code to proceed. This OTP is valid for the next 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you,</p>
            <p>Crevio</p>
          </div>
        </div>
      </body>
      </html>
    `;
}