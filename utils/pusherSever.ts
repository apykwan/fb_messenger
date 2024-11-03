'use server';

import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "us3",
  useTLS: true
});

export const clientPusher = new ClientPusher(process.env.PUSHER_APP_ID!, {
  cluster: 'us3',
  forceTLS: true
});
