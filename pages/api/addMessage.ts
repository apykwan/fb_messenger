import type { NextApiRequest, NextApiResponse } from 'next';

import { serverPusher } from '@/utils/pusherSever';
import { redisDB } from '@/lib/redis';
import { type MessageType } from '@/types';
 
type ResponseData = {
  message: MessageType;
}

type ErrorData = {
  body: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorData>
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ body: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ body: 'Message content is required' });
    }

    const newMessage = {
      ...message,
      created_at: Date.now()
    };

    const redis = await redisDB();
    await redis.hset(`message`, message.id, JSON.stringify(newMessage));
    serverPusher.trigger('messages', 'new-message', newMessage);

    res.status(200).json({ message: newMessage });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ body: 'Internal Server Error' });
  }
}

