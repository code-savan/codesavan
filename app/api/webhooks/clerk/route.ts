import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers');
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  // Get the webhook secret from the environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return new Response('Error: Missing CLERK_WEBHOOK_SECRET', {
      status: 500,
    });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error: Invalid webhook signature', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  // Log the event type
  console.log(`Webhook received: ${eventType}`);

  // Handle the event
  switch (eventType) {
    case 'user.created':
      // A new user was created
      console.log('User created:', evt.data);
      break;
    case 'user.updated':
      // User data was updated
      console.log('User updated:', evt.data);
      break;
    case 'session.created':
      // A new session was created
      console.log('Session created:', evt.data);
      break;
    case 'session.ended':
      // A session was ended
      console.log('Session ended:', evt.data);
      break;
    default:
      // Unhandled event type
      console.log(`Unhandled event type: ${eventType}`);
      break;
  }

  return NextResponse.json({ success: true, event: eventType });
}
