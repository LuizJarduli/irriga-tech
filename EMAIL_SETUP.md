# Email Configuration for IrrigaTech

This project includes a custom email service for handling contact form submissions using Astro's SSR capabilities.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@irrigatech.com
```

### 2. Gmail Setup (Recommended)

If using Gmail as your email provider:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this app password in `SMTP_PASS` (not your regular Gmail password)

### 3. Alternative Email Providers

You can use other SMTP providers by changing the configuration:

#### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-smtp-username
SMTP_PASS=your-mailgun-smtp-password
```

#### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

## API Endpoint

The email functionality is handled by the API endpoint at `/api/send-email` which:

- Accepts POST requests with JSON data
- Validates email format and required fields
- Sends formatted HTML and text emails
- Returns appropriate success/error responses

## Usage

The contact form automatically uses this API endpoint. No additional configuration is needed once the environment variables are set.

## Testing

To test the email functionality:

1. Set up your environment variables
2. Start the development server: `pnpm dev`
3. Navigate to the contact page
4. Submit the contact form
5. Check your email inbox for the message

## Troubleshooting

- **"Serviço de email não configurado"**: Check that `SMTP_USER` and `SMTP_PASS` are set
- **Authentication failed**: Verify your email credentials and app password
- **Connection timeout**: Check your SMTP host and port settings
- **Email not received**: Check spam folder and verify `CONTACT_EMAIL` is correct
