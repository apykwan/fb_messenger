'use client';

import ClientPusher from 'pusher-js';

export const clientPusher = new ClientPusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: 'us3',
  forceTLS: true
});
