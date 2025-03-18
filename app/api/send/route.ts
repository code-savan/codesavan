import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Mock successful email sending
    console.log('Mock email sending:', { name, email, message });

    // Return mock success response
    return NextResponse.json({
      id: 'mock-email-id',
      status: 'success'
    });

    /* Real implementation (commented out)
    const data = await resend.emails.send({
      from: 'Code Savan <onboarding@resend.dev>',
      to: ['eric.marvelboy@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      reply_to: email,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(data);
    */
  } catch (error) {
    return NextResponse.json({ error: 'Mock error' });
  }
}
