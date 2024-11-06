import type { NextApiRequest, NextApiResponse } from 'next';

import { redisDB } from '@/lib/redis';
import { type MessageType } from '@/types';
 
type ResponseData = {
  messages: MessageType[];
}

type ErrorData = {
  body: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorData>
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ body: 'Method not allowed' });
    }

    const redis = await redisDB();
    const messagesRes = await redis.hvals('message');
    const messages: MessageType[] = messagesRes
      .map(msg => JSON.parse(msg))
      .sort((a, b) => a.created_at - b.created_at);

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ body: 'Internal Server Error' });
  }
}

