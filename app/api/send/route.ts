import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Route segment config
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Check if API key is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    const { name, email, message } = await req.json();

    console.log('Received contact form submission:', { name, email, message: message.substring(0, 20) + '...' });

    // Validate inputs
    if (!name || !email || !message) {
      console.warn('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    console.log('Sending email via Resend...');

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Code Savan <onboarding@resend.dev>',
      to: ['eric.marvelboy@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    h2 { color: #2563eb; }
    .info { margin-bottom: 20px; }
    .label { font-weight: bold; }
    .message { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Contact Form Submission</h2>
    <div class="info">
      <p><span class="label">Name:</span> ${name}</p>
      <p><span class="label">Email:</span> ${email}</p>
    </div>
    <div class="info">
      <p class="label">Message:</p>
      <div class="message">${message.replace(/\n/g, '<br>')}</div>
    </div>
  </div>
</body>
</html>
      `,
    });

    console.log('Email sent successfully:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
